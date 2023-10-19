import { useTranslation } from "react-i18next";
import FamsNFT from "../famsNft.json";
import GenesisNFT from "../genesisNft.json";
import FlipCard, { BackCard, FrontCard } from "../components/FlipCard";
import { Network, Alchemy } from "alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccount,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { prepareWriteContract } from "@wagmi/core";

import React from "react";
import { BigNumber, ethers } from "ethers";
import ReactLoading from "react-loading";
import router from "next/router";
import { Web3ConnectButton } from "@/components/Web3ConnectButton";
import { parseEther } from "ethers/lib/utils.js";
const GenesisNFTAddress = "0x21D4B6F00C8b4026AC692276DDeA3d720c8cF329";
const FamsNFTAddress = "0x9420c362682868E1921A10794fe55aEAAD2A5B93";
// const GenesisNFTAddress = '0x6810C884c95c1De5C1C79b1a001DC730CCe22e40';
// const FamsNFTAddress = '0xB99f77343A870BF23D391501EEc999efca52Fbf4';
// const settings = {
//   apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY", // Replace with your Alchemy API Key.
//   network: Network.ETH_MAINNET, // Replace with your network.
// };
// const alchemy = new Alchemy(settings);

export default function Passport() {
  const provider = new ethers.providers.AlchemyProvider(
    "homestead",
    "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY"
  );

  const Fmint = new ethers.Contract(FamsNFTAddress, FamsNFT.abi, provider);
  const Gmint = new ethers.Contract(
    GenesisNFTAddress,
    GenesisNFT.abi,
    provider
  );

  const [gasFam, setGasFam] = React.useState<Number>(21000);
  const [gasGen, setGasGen] = React.useState<Number>(21000);
  const { t } = useTranslation();
  const [supply, setSupply] = React.useState(0);
  const [connected, setConnected] = React.useState(false);
  const { isConnected, address } = useAccount();

  const mintFamsFun = async function () {
    const gasfam = await Fmint.estimateGas.mint({
      from: address,
      value: ethers.utils.parseEther("0.25"),
    });
    setGasFam(gasfam.toNumber() + 20000);
    famsMint?.();
  };
  const mintGenFun = async function () {
    const gasGen = await Gmint.estimateGas.mint({
      from: address,
      value: ethers.utils.parseEther("1"),
    });
    setGasGen(gasGen.toNumber() + 20000);
    genesisMint?.();
  };

  const { config: configGenesisMint } = usePrepareContractWrite({
    address: GenesisNFTAddress,
    abi: GenesisNFT.abi,
    functionName: "mint",
    args: [],
    overrides: {
      value: ethers.utils.parseEther("1"),
      gasLimit: BigNumber.from(gasGen),
    },
  });
  const { config: configFamsMint } = usePrepareContractWrite({
    address: FamsNFTAddress,
    abi: FamsNFT.abi,
    functionName: "mint",
    args: [],
    overrides: {
      value: ethers.utils.parseEther("0.25"),
      gasLimit: BigNumber.from(gasFam),
    },
  });
  const mintGenesis = async () => {
    if (!genesisOpen) {
      toast.error("Mint not open.");
      return;
    }
    if (supply >= 321) {
      toast.error("Out of supply");
      return;
    }

    if (genesisMinted?._hex * 1 > 0) {
      toast.error("You have already minted a Genesis NFT");
      return;
    }
    mintGenFun();
  };
  const mintFams = async () => {
    if (!famsOpen) {
      toast.error("Mint not open.");
      return;
    }
    if (famsMinted?._hex * 1 > 0) {
      toast.error("You have already minted a Fams NFT");
      return;
    }
    mintFamsFun();
  };

  const {
    data: genesisData,
    isLoading: genesIsLoading,
    isSuccess: genesisSuccess,
    error: genesisError,
    write: genesisMint,
  } = useContractWrite(configGenesisMint);
  const {
    data: famsData,
    isLoading: famsIsLoading,
    isSuccess: famsSuccess,
    error: famsError,
    write: famsMint,
  } = useContractWrite(configFamsMint);

  const { data: genesisMintInfo }: any = useContractRead({
    address: GenesisNFTAddress,
    abi: GenesisNFT.abi,
    functionName: "totalSupply",
    watch: true,
  } as UseContractReadConfig);
  const { data: genesisMinted }: any = useContractRead({
    address: GenesisNFTAddress,
    abi: GenesisNFT.abi,
    functionName: "numberMinted",
    args: [address],
  } as UseContractReadConfig);

  const { data: genesisOpen }: any = useContractRead({
    address: GenesisNFTAddress,
    abi: GenesisNFT.abi,
    functionName: "open",
  } as UseContractReadConfig);

  const { data: famsMinted }: any = useContractRead({
    address: FamsNFTAddress,
    abi: FamsNFT.abi,
    functionName: "numberMinted",
    args: [address],
  } as UseContractReadConfig);
  const { data: famsOpen }: any = useContractRead({
    address: FamsNFTAddress,
    abi: GenesisNFT.abi,
    functionName: "open",
  } as UseContractReadConfig);
  const {
    data: gnData,
    isSuccess: gnSuccess,
    error: gnError,
  } = useWaitForTransaction({
    hash: genesisData?.hash,
  });

  const {
    data: faData,
    isSuccess: faSuccess,
    error: faError,
  } = useWaitForTransaction({
    hash: famsData?.hash,
  });

  React.useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);
  React.useEffect(() => {
    setSupply(genesisMintInfo?._hex * 1);
  }, [genesisMintInfo]);

  return (
    <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
      <div className=" w-full min-h-screen mx-auto">
        {connected ? (
          <div className="w-[1080px] h-full mx-auto">
            <h1 className="text-2xl py-8">{t("passport_title")}</h1>
            <p className=" py-2">{t("passport_subtitle")}</p>
            <p className=" py-2">
              {t("passport_link_intro")}
              <a
                href="https://2ndc.notion.site/ec8a2cf0d47b49ea92fd8faaf8b6f620"
                target={"_blank"}
              >
                {t("passport_link_text")}
              </a>
            </p>
            <div className="flex justify-between pt-0 mt-12">
              <div className="w-[340px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl relative text-base ">
                <FlipCard>
                  <FrontCard isCardFlipped={gnSuccess}>
                    {gnError ? (
                      <>
                        <div className=" w-fullbg-opacity-80 text-center flex h-full flex-col justify-between   items-center">
                          <p className="pt-10">
                            Mint error,the transaction is failed,please try
                            again later
                          </p>
                          <p>or</p>
                          <a
                            target={"_blank"}
                            className="py-2 w-1/2  bg-white text-black text-center rounded-full "
                            href={`https://goerli.etherscan.io/tx/${genesisData?.hash}`}
                          >
                            Etherscan
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        {genesIsLoading ? (
                          <div className=" w-full h-full bg-opacity-80 text-center flex  items-center justify-center">
                            <ReactLoading type="bars" color="#fff" />

                            <div>Minting...</div>
                          </div>
                        ) : (
                          <div className="w-full text-base">
                            <p className="text-right text-red text-sm">
                              {"01"}
                            </p>
                            <h2 className="text-xl py-2 pt-6">
                              {t("passport_title_type1")}
                            </h2>
                            <ul className="text-sm leading-[1.6rem] mt-4">
                              <li className="text-sm py-2">
                                - {t("passport_intro1_type1")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro2_type1")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro3_type1")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro4_type1")}
                              </li>
                            </ul>
                            <p className="flex justify-between mt-8">
                              <span className="text-sm">
                                - {t("label_progress")}
                              </span>
                              <span>{supply}/321</span>
                            </p>

                            <button
                              className="py-2  mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                              onClick={() => {
                                mintGenesis();
                              }}
                            >
                              <span className="text-red mr-2">-</span>
                              <span>1E</span>
                              <span className="text-red  ml-2"> -</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </FrontCard>
                  <BackCard isCardFlipped={gnSuccess}>
                    {/* <BackCard isCardFlipped={minted}> */}
                    {/* <div className='relative'> */}
                    <div className="flex h-full flex-col justify-between">
                      <video
                        src="/genesis.mp4"
                        width="300"
                        height="300"
                        //  onLoad={loadingVideo}
                        // onLoad={() => loadingVideo}
                        loop={true}
                        controls={false}
                        preload="auto"
                        autoPlay={true}
                        muted
                      ></video>
                      <div className="flex justify-between  divide-x">
                        <a
                          target={"_blank"}
                          className="py-2 w-1/2  bg-white text-black text-center rounded-tl-full  rounded-bl-full"
                          href={`https://etherscan.io/tx/${genesisData?.hash}`}
                        >
                          Etherscan
                        </a>
                        <a
                          target={"_blank"}
                          className="py-2  w-1/2  bg-white text-black text-center rounded-tr-full  rounded-br-full"
                          href={`https://opensea.io/collection/second-class-genesis`}
                        >
                          Opensea
                        </a>
                      </div>
                    </div>
                  </BackCard>
                </FlipCard>
              </div>
              <div className="w-[340px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl relative text-base ">
                <FlipCard>
                  <FrontCard isCardFlipped={faSuccess}>
                    {faError ? (
                      <>
                        <div className=" w-fullbg-opacity-80 text-center flex h-full flex-col justify-between   items-center">
                          <p className="pt-10">
                            Mint error,the transaction is failed,please try
                            again later
                          </p>
                          <p>or</p>
                          <a
                            target={"_blank"}
                            className="py-2 w-1/2  bg-white text-black text-center rounded-full "
                            href={`https://etherscan.io/tx/${genesisData?.hash}`}
                          >
                            Etherscan
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        {famsIsLoading ? (
                          <div className=" w-full h-full bg-opacity-80 text-center flex  items-center justify-center">
                            <ReactLoading type="bars" color="#fff" />

                            <div>Minting...</div>
                          </div>
                        ) : (
                          <div className="w-full text-base">
                            <p className="text-right text-red text-sm">
                              {"02"}
                            </p>
                            <h2 className="text-xl py-2 pt-6">
                              {t("passport_title_type2")}
                            </h2>
                            <ul className="text-sm leading-[1.6rem] mt-4">
                              <li className="text-sm py-2">
                                - {t("passport_intro1_type2")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro2_type2")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro3_type2")}
                              </li>
                              <li className="text-sm py-2">
                                - {t("passport_intro4_type2")}
                              </li>
                            </ul>
                            <p className="flex justify-between mt-8">
                              <span className="text-sm">
                                - {t("label_progress")}
                              </span>
                              <span>Checking</span>
                            </p>

                            <button
                              className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                              onClick={() => {
                                mintFams();
                              }}
                            >
                              <span className="text-red mr-2">-</span>

                              <span>0.25E</span>
                              <span className="text-red  ml-2"> -</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </FrontCard>
                  <BackCard isCardFlipped={faSuccess}>
                    <div className="flex h-full flex-col justify-between">
                      {/* <Image
                                            src={demoNft}
                                            width="300"
                                            height="300"
                                            alt="NFT"
                                            className='rounded-lg'
                                        /> */}
                      <video
                        src="/fams.mp4"
                        width="300"
                        height="300"
                        //  onLoad={loadingVideo}
                        // onLoad={() => loadingVideo}
                        loop={true}
                        controls={false}
                        preload="auto"
                        autoPlay={true}
                        muted
                      ></video>
                      <div className="flex justify-between ">
                        <a
                          target={"_blank"}
                          className="py-2 w-full  bg-white text-black text-center rounded-full"
                          href={`https://etherscan.io/tx/${famsData?.hash}`}
                        >
                          Etherscan
                        </a>
                      </div>
                    </div>
                  </BackCard>
                </FlipCard>
              </div>
              <div className="  w-[340px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">
                <div className="w-full text-base">
                  <p className="text-right text-red text-sm">03</p>
                  <h2 className="text-xl py-2 pt-6">
                    {t("passport_title_type3")}
                  </h2>
                  <ul className="text-sm leading-[1.6rem] mt-4">
                    <li className="text-sm py-2">
                      - {t("passport_intro1_type3")}
                    </li>
                    <li className="text-sm py-2">
                      - {t("passport_intro2_type3")}
                    </li>
                    <li className="text-sm py-2">&nbsp;</li>
                    <li className="text-sm py-2">&nbsp;</li>
                  </ul>
                  <p className="flex justify-between mt-8">
                    <span className="text-sm">- {t("label_progress")}</span>
                    <span>Checking</span>
                  </p>

                  <button
                    className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                    onClick={() => router.push("/social")}
                  >
                    <span className="text-red mr-2">-</span>
                    <span>{t("contact_us")}</span>
                    <span className="text-red  ml-2"> -</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center min-h-screen items-center h-full">
            <h1 className="text-[26px] my-16">{t("passport_title")}</h1>
            <div className="my-16">
              <Web3ConnectButton />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
