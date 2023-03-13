import { useTranslation } from 'react-i18next';
import MintSndcNFT from '../mintSndcNFT.json';
import GenesisNFT from '../genesisNft.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useAccount,
    useContractRead,
    UseContractReadConfig,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';

import React from 'react';
import { BigNumber, ethers } from 'ethers';
import ReactLoading from 'react-loading';
import router from 'next/router';
import { Web3ConnectButton } from '@/components/Web3ConnectButton';

export default function Passport() {
    const { t } = useTranslation();
    const [minted, setMinted] = React.useState(false);
    const [supply, setSupply] = React.useState(0);
    const [connected, setConnected] = React.useState(false);
    const { isConnected, address } = useAccount();
    const { config: configGenesisMint } = usePrepareContractWrite({
        address: '0xfa0d6BB11D53Ab1be30FBA89b972b506c3F59b09',
        abi: MintSndcNFT.abi,
        functionName: 'genesisMint',
        args: [],
        overrides: {
            value: ethers.utils.parseEther('0.4'),
            gasLimit: BigNumber.from('300000'),
        },
    })
    const { config: configFamsMint } = usePrepareContractWrite({
        address: '0xfa0d6BB11D53Ab1be30FBA89b972b506c3F59b09',
        abi: MintSndcNFT.abi,
        functionName: 'famsMint',
        args: [],
        overrides: {
            value: ethers.utils.parseEther('0.25'),
            gasLimit: BigNumber.from('300000'),
        },
    })
    const mintGenesis = () => {

        if (supply >= 321) {
            toast.error('Out of supply')
            return
        }

        if (genesisMinted?._hex * 1 > 0) {
            toast.error('You have already minted a Genesis NFT')
            return
        }
        genesisMint?.()
    }
    const mintFams = async () => {

        if (famsMinted?._hex * 1 > 0) {
            toast.error('You have already minted a Fams NFT')
            return
        }
        famsMint?.()
    }

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
        error: famsError,
        write: famsMint
    } = useContractWrite(configFamsMint)

    const { data: genesisMintInfo }: any = useContractRead({
        address: '0x805D50aeA0782C809F8DCCf98af18100D8C4FF28',
        abi: GenesisNFT.abi,
        functionName: 'totalSupply',
        watch: true,
    } as UseContractReadConfig);
    const { data: genesisMinted }: any = useContractRead({
        address: '0x805D50aeA0782C809F8DCCf98af18100D8C4FF28',
        abi: GenesisNFT.abi,
        functionName: 'numberMinted',
        args: [address],
    } as UseContractReadConfig);
    const { data: famsMinted }: any = useContractRead({
        address: '0x115DDeF62C8d57D90fBc1036E735275382a74ce1',
        abi: GenesisNFT.abi,
        functionName: 'numberMinted',
        args: [address],
    } as UseContractReadConfig);
    // console.log(famsMinted)
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
        setConnected(isConnected)
    }, [isConnected]);
    React.useEffect(() => {
        setSupply(genesisMintInfo?._hex * 1)
    }, [genesisMintInfo]);


    return (

        <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
            <div className=' w-full min-h-screen mx-auto'>
                {connected ? (
                    <div className="w-[1080px] h-full mx-auto">
                        <h1 className='text-2xl py-8'>{t('passport_title')}</h1>
                        <p className=' py-2'>{t('passport_subtitle')}</p>
                        <p className=' py-2'>{t('passport_link_intro')}<a href="https://2ndc.notion.site/ec8a2cf0d47b49ea92fd8faaf8b6f620" target={'_blank'}>{t('passport_link_text')}</a></p>
                        <div className='flex justify-between pt-0 mt-12'>

                            <div className="w-[340px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl relative text-base ">
                                <FlipCard>

                                    <FrontCard isCardFlipped={gnSuccess}>
                                        {gnError ? <>
                                            <div className=' w-fullbg-opacity-80 text-center flex h-full flex-col justify-between   items-center'>
                                                <p className='pt-10'>Mint error,the transaction is failed,please try again later</p>
                                                <p>or</p>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2 w-1/2  bg-white text-black text-center rounded-full "
                                                    href={`https://goerli.etherscan.io/tx/${genesisData?.hash}`}>
                                                    Etherscan
                                                </a>
                                            </div>
                                        </> : <>{genesIsLoading ?
                                            <div className=' w-full h-full bg-opacity-80 text-center flex  items-center justify-center'>
                                                <ReactLoading type='bars' color="#fff" />

                                                <div>Minting...</div>
                                            </div> :
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

                                                <button
                                                    className="py-2  mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                                    onClick={() => { mintGenesis() }}
                                                >
                                                    <span className='text-red mr-2'>-</span>
                                                    <span>
                                                        0.4E
                                                    </span>
                                                    <span className='text-red  ml-2'>  -</span>
                                                </button>

                                            </div>
                                        }</>}

                                    </FrontCard>
                                    <BackCard isCardFlipped={gnSuccess}>

                                        {/* <BackCard isCardFlipped={minted}> */}
                                        {/* <div className='relative'> */}
                                        <div className='flex h-full flex-col justify-between'>

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
                                            <div className='flex justify-between  divide-x'>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2 w-1/2  bg-white text-black text-center rounded-tl-full  rounded-bl-full"
                                                    href={`https://etherscan.io/tx/${genesisData?.hash}`}>
                                                    Etherscan
                                                </a>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2  w-1/2  bg-white text-black text-center rounded-tr-full  rounded-br-full"
                                                    href={`https://opensea.io/assets/0x805D50aeA0782C809F8DCCf98af18100D8C4FF28/${supply-1}`}
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
                                        {faError ? <>
                                            <div className=' w-fullbg-opacity-80 text-center flex h-full flex-col justify-between   items-center'>
                                                <p className='pt-10'>Mint error,the transaction is failed,please try again later</p>
                                                <p>or</p>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2 w-1/2  bg-white text-black text-center rounded-full "
                                                    href={`https://etherscan.io/tx/${genesisData?.hash}`}>
                                                    Etherscan
                                                </a>
                                            </div>
                                        </> : <>
                                            {famsIsLoading ?
                                                <div className=' w-full h-full bg-opacity-80 text-center flex  items-center justify-center'>
                                                    <ReactLoading type='bars' color="#fff" />

                                                    <div>Minting...</div>
                                                </div> :
                                                <div className="w-full text-base" >
                                                    <p className='text-right text-red text-sm'>{'02'}</p>
                                                    <h2 className='text-xl py-2 pt-6'>{t('passport_title_type2')}</h2>
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

                                                    <button
                                                        className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                                        onClick={() => { mintFams() }}

                                                    >
                                                        <span className='text-red mr-2'>-</span>

                                                        <span>

                                                            0.25E
                                                        </span>
                                                        <span className='text-red  ml-2'>  -</span>
                                                    </button>

                                                </div>}
                                        </>}
                                    </FrontCard>
                                    <BackCard isCardFlipped={faSuccess}>
                                        <div className='flex h-full flex-col justify-between'>
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
                                            <div className='flex justify-between  divide-x'>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2 w-1/2  bg-white text-black text-center rounded-tl-full  rounded-bl-full"
                                                    href={`https://etherscan.io/tx/${famsData?.hash}`}>
                                                    Etherscan
                                                </a>
                                                <a
                                                    target={'_blank'}
                                                    className="py-2  w-1/2  bg-white text-black text-center rounded-tr-full  rounded-br-full"
                                                    href={`https://opensea.io/assets/0x8674210a9853ed9cf8357d7f21a10999f8282189/${supply-1}`}
                                                >
                                                    Opensea
                                                </a>
                                            </div>
                                        </div>
                                    </BackCard>
                                </FlipCard>
                            </div>
                            <div className="  w-[340px] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">

                                <div className="w-full text-base" >
                                    <p className='text-right text-red text-sm'>03</p>
                                    <h2 className='text-xl py-2 pt-6'>{t('passport_title_type3')}</h2>
                                    <ul className='text-sm leading-[1.6rem] mt-4'>
                                        <li className='text-sm py-2'>- {t('passport_intro1_type3')}</li>
                                        <li className='text-sm py-2'>- {t('passport_intro2_type3')}</li>
                                        <li className='text-sm py-2'>&nbsp;</li>
                                        <li className='text-sm py-2'>&nbsp;</li>
                                    </ul>
                                    <p className='flex justify-between mt-8'>
                                        <span className='text-sm'>- {t('label_progress')}</span>
                                        <span>Checking</span>
                                    </p>


                                    <button
                                        className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full"
                                        onClick={() => router.push('/social')}
                                    >
                                        <span className='text-red mr-2'>-</span>
                                        <span>
                                            {t('contact_us')}
                                        </span>
                                        <span className='text-red  ml-2'>  -</span>
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center min-h-screen items-center h-full'>
                        <h1 className='text-[26px] my-16'>
                            {t('passport_title')}
                        </h1>
                        <div className='my-16'>
                            <Web3ConnectButton />
                           
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

