import { useTranslation } from 'react-i18next';
import MintSndcNFT from '../mintSndcNFT.json';
import GenesisNFT from '../genesisNft.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import Image from 'next/image';
import demoNft from '../assets/nft_demo.jpg'
import {
    useAccount,
    useContractRead,
    UseContractReadConfig,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import React from 'react';
import { BigNumber, ethers } from 'ethers';

const contractConfig = {
    address: '0x6E8D1838ce1c6425887c6B8E03029fC63F3DACA2',
    MintSndcNFT,
};
export default function Passport() {
    const { t } = useTranslation();
    // const [mounted, setMounted] = React.useState(false);
    const [supply, setSupply] = React.useState(0);
    const [minted, setMinted] = React.useState(false);
    // React.useEffect(() => setMounted(true), []);
    const [connected, setConnected] = React.useState(false);
    const { isConnected } = useAccount();
    const { config: configGenesisMint } = usePrepareContractWrite({
        address: '0x6E8D1838ce1c6425887c6B8E03029fC63F3DACA2',
        abi: MintSndcNFT.abi,
        functionName: 'genesisMint',
        args: [],
       
        overrides: {
            value: ethers.utils.parseEther('0.4'),
            gasLimit:BigNumber.from('1')           
            // gasPrice:  ethers.utils.parseEther('0.00005')
        },
    })
    const { config: configFamsMint } = usePrepareContractWrite({
        address: '0x6E8D1838ce1c6425887c6B8E03029fC63F3DACA2',
        abi: MintSndcNFT.abi,
        functionName: 'famsMint',
        args: [],
        overrides: {
            value: ethers.utils.parseEther('0.25'),
            gasLimit:BigNumber.from('1')           
            // gasLimit: ethers.utils.parseEther('0.00001'),
            // gasPrice:  ethers.utils.parseEther('0.00005')
        },
    })

    // const {
    //     data: mintData,
    //     write: handleMint,
    //     isLoading: isMintLoading,
    //     isSuccess: isMintStarted,
    //     error: mintError,
    // } = useContractWrite(config as UseContractWriteConfig);

    const { 
        data: genesisData, 
        isLoading: genesIsLoading, 
        isSuccess: genesisSuccess, 
        error: genesisError,
        write: genesisMint 
    } = useContractWrite(configGenesisMint)
    const { 
        data: famsData, 
        isLoading: famsIsLoading, 
        isSuccess: famsSuccess, 
        write: famsMint 
    } = useContractWrite(configFamsMint)



    const { data: genesisMintInfo }: any = useContractRead({
        address: '0x4eb7F91cbc8317855A33f9BED19C3f91cA623E8b',
        abi:GenesisNFT.abi,
        functionName: 'totalSupply',
        watch: true,
    } as UseContractReadConfig);
    const {
        data: txData,
        isSuccess: txSuccess,
        error: txError,
    } = useWaitForTransaction({
        hash: genesisData?.hash,
    });

    React.useEffect(() => {
        setConnected(isConnected)


    }, [isConnected]);
    React.useEffect(() => {
        console.log(genesisMintInfo)
        setSupply(genesisMintInfo?._hex * 1)


    }, [genesisMintInfo]);
    React.useEffect(() => {
       console.log(txData)


    }, [txData]);
    
    return (

        <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
            <div className=' w-full min-h-screen mx-auto'>
                <div className="w-[1080px] h-full mx-auto">
                    <h1 className='text-2xl py-8'>{t('passport_title')}</h1>
                    <p className=' py-2'>{t('passport_subtitle')}</p>
                    <p className=' py-2'>{t('passport_link_intro')}<a href="#">{t('passport_link_text')}</a></p>
                    <div className='flex justify-between pt-0 mt-12'>

                        <div className="  w-[360px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">
                            <FlipCard>
                                <FrontCard isCardFlipped={txSuccess}>
                                    <div className="w-full text-base" >
                                        <p className='text-right text-red text-sm'>{'01'}</p>
                                        <h2 className='text-xl py-2 pt-6'>{t('passport_title_type1')}</h2>
                                        <ul className='text-sm leading-[1.6rem] mt-4'>
                                            <li className='text-sm py-2'>- {t('passport_intro1_type1')}</li>
                                            <li className='text-sm py-2'>- {t('passport_intro2_type1')}</li>
                                            <li className='text-sm py-2'>- {t('passport_intro3_type1')}</li>
                                            <li className='text-sm py-2'>- {t('passport_intro4_type1')}</li>
                                        </ul>
                                        <p className='flex justify-between mt-8'>
                                            <span className='text-sm'>- {t('label_progress')}</span>
                                            <span>{supply}/321</span>
                                        </p>
                                        {connected ? (
                                            <button
                                                className="py-2  mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                                // onClick={() => { setMinted(true) }}
                                                onClick={() => { genesisMint?.() }}
                                            >
                                                <span className='text-red mr-2'>-</span>
                                                <span>
                                                    0.4E
                                                </span>
                                                <span className='text-red  ml-2'>  -</span>
                                            </button>
                                        ) : (
                                            <div className="py-2px-8 mt-8  flex items-center justify-center">
                                                <ConnectButton />
                                            </div>
                                        )}
                                    </div>

                                </FrontCard>
                                <BackCard isCardFlipped={txSuccess}>
                                    {/* <div className='relative'> */}
                                    <div>
                                        <Image
                                            src={demoNft}
                                            width="300"
                                            height="300"
                                            alt="NFT"
                                            className='rounded-lg'
                                        />
                                        <div>
                                            {/* <a href={`https://goerli.etherscan.io/tx/${genesisData?.hash}`}>
                                                Etherscan
                                            </a>
                                            <a
                                                href={`https://testnets.opensea.io/assets/goerli/${txData?.to}/1`}
                                            >
                                                Opensea
                                            </a> */}
                                        </div>
                                    </div>
                                </BackCard>
                            </FlipCard>
                        </div>
                        <div className="  w-[30%] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">
                            <div className="w-full text-base" >
                                <p className='text-right text-red text-sm'>{'02'}</p>
                                <h2 className='text-xl py-2 pt-6'>{t('passport_title_type2')}</h2>
                                {/* <h3 className=' py-1 underline decoration-wavy text-red'>功能描述&nbsp;&nbsp;</h3> */}
                                <ul className='text-sm leading-[1.6rem] mt-4'>
                                    <li className='text-sm py-2'>- {t('passport_intro1_type2')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro2_type2')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro3_type2')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro4_type2')}</li>
                                </ul>
                                <p className='flex justify-between mt-8'>
                                    <span className='text-sm'>- {t('label_progress')}</span>
                                    <span>Checking</span>
                                </p>
                                {connected ? (
                                    <button
                                        className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                        onClick={() => { famsMint?.() }}
                                    >
                                        <span className='text-red mr-2'>-</span>

                                        <span>

                                            0.25E
                                        </span>
                                        <span className='text-red  ml-2'>  -</span>
                                    </button>
                                ) : (
                                    <div className="py-2px-8 mt-8  flex items-center justify-center">
                                        <ConnectButton />
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="  w-[30%] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">
                            <div className="w-full text-base" >
                                <p className='text-right text-red text-sm'>03</p>
                                <h2 className='text-xl py-2 pt-6'>{t('passport_title_type3')}</h2>
                                {/* <h3 className=' py-1 underline decoration-wavy text-red'>功能描述&nbsp;&nbsp;</h3> */}
                                <ul className='text-sm leading-[1.6rem] mt-4'>
                                    <li className='text-sm py-2'>- {t('passport_intro1_type3')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro2_type3')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro3_type3')}</li>
                                    <li className='text-sm py-2'>- {t('passport_intro4_type3')}</li>
                                </ul>
                                <p className='flex justify-between mt-8'>
                                    <span className='text-sm'>- {t('label_progress')}</span>
                                    <span>Checking</span>
                                </p>

                                {connected ? (
                                    <button
                                        className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                        // onClick={() => { famsMint?.() }}
                                    >
                                        <span className='text-red mr-2'>-</span>

                                        <span>

                                            {t('label_freemint')}
                                        </span>
                                        <span className='text-red  ml-2'>  -</span>
                                    </button>
                                ) : (
                                    <div className="py-2px-8 mt-8  flex items-center justify-center">
                                        <ConnectButton />
                                    </div>
                                )}
                            </div>

                        </div>



                    </div>
                </div>
            </div>

        </div>
    )
}

