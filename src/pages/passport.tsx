import { useTranslation } from 'react-i18next';
import MintSndcNFT from '../mintSndcNFT.json';
import GenesisNFT from '../genesisNft.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import Image from 'next/image';
import demoNft from '../assets/nft_demo.jpg'
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
import { ConnectButton } from '@rainbow-me/rainbowkit';

import React from 'react';
import { BigNumber, ethers } from 'ethers';
import ReactLoading from 'react-loading';


export default function Passport() {
    const { t } = useTranslation();
    const [minted, setMinted] = React.useState(false);
    const [supply, setSupply] = React.useState(0);
    const [connected, setConnected] = React.useState(false);
    const { isConnected, address } = useAccount();
    const { config: configGenesisMint } = usePrepareContractWrite({
        address: '0x6E8D1838ce1c6425887c6B8E03029fC63F3DACA2',
        abi: MintSndcNFT.abi,
        functionName: 'genesisMint',
        args: [],
        overrides: {
            value: ethers.utils.parseEther('0.4'),
            gasLimit: BigNumber.from('300000'),
        },
    })
    const { config: configFamsMint } = usePrepareContractWrite({
        address: '0x6E8D1838ce1c6425887c6B8E03029fC63F3DACA2',
        abi: MintSndcNFT.abi,
        functionName: 'famsMint',
        args: [],
        overrides: {
            value: ethers.utils.parseEther('0.25'),
            gasLimit: BigNumber.from('300000'),
        },
    })
    const mintGenesis = () => {
        
        if(supply>=321){
            toast.error('Out of supply')
            return
        }
        debugger
        if(genesisMinted?._hex*1>0){
            toast.error('You have already minted a Genesis NFT')
            return
        }
        genesisMint?.()
        
    }
    const mintFams = async () => {
       
        if(famsMinted?._hex*1>0){
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
    console.log(famsData)


    const { data: genesisMintInfo }: any = useContractRead({
        address: '0x4eb7F91cbc8317855A33f9BED19C3f91cA623E8b',
        abi: GenesisNFT.abi,
        functionName: 'totalSupply',
        watch: true,
    } as UseContractReadConfig);
    const { data: genesisMinted }: any = useContractRead({
        address: '0x4eb7F91cbc8317855A33f9BED19C3f91cA623E8b',
        abi: GenesisNFT.abi,
        functionName: 'numberMinted',
        args: [address],
    } as UseContractReadConfig);
    const { data: famsMinted }: any = useContractRead({
        address: '0xb575A42F7A9507c838Cc81C094eD47b7779bBA63',
        abi: GenesisNFT.abi,
        functionName: 'numberMinted',
        args: [address],
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

    // if (faError) {
    //     toast.error('Fams mint error,the transaction is failed,please try again later')
    // }
    // if (gnError) {
    //     toast.error('Genesis mint error,the transaction is failed,please try again later')
    // }
    React.useEffect(() => {
        setConnected(isConnected)


    }, [isConnected]);
    React.useEffect(() => {
        console.log(genesisMintInfo)
        setSupply(genesisMintInfo?._hex * 1)
    }, [genesisMintInfo]);


    return (

        <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
            <div className=' w-full min-h-screen mx-auto'>
                <div className="w-[1080px] h-full mx-auto">
                    <h1 className='text-2xl py-8'>{t('passport_title')}</h1>
                    <p className=' py-2'>{t('passport_subtitle')}</p>
                    <p className=' py-2'>{t('passport_link_intro')}<a href="#">{t('passport_link_text')}</a></p>
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
                                            {connected ? (
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
                                            ) : (
                                                <div className="py-2px-8 mt-8  flex items-center justify-center">
                                                    <ConnectButton />
                                                </div>
                                            )}
                                        </div>
                                    }</>}

                                </FrontCard>
                                <BackCard isCardFlipped={gnSuccess}>

                                    {/* <BackCard isCardFlipped={minted}> */}
                                    {/* <div className='relative'> */}
                                    <div className='flex h-full flex-col justify-between'>
                                        <Image
                                            src={demoNft}
                                            width="300"
                                            height="300"
                                            alt="NFT"
                                            className='rounded-lg'
                                        />
                                        <div className='flex justify-between  divide-x'>
                                            <a
                                                target={'_blank'}
                                                className="py-2 w-1/2  bg-white text-black text-center rounded-tl-full  rounded-bl-full"
                                                href={`https://goerli.etherscan.io/tx/${genesisData?.hash}`}>
                                                Etherscan
                                            </a>
                                            <a
                                                target={'_blank'}
                                                className="py-2  w-1/2  bg-white text-black text-center rounded-tr-full  rounded-br-full"
                                                href={`https://testnets.opensea.io/assets/goerli/${gnData?.to}`}
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
                                                href={`https://goerli.etherscan.io/tx/${genesisData?.hash}`}>
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
                                                {connected ? (
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
                                                ) : (
                                                    <div className="py-2px-8 mt-8  flex items-center justify-center">
                                                        <ConnectButton />
                                                    </div>
                                                )}
                                            </div>}
                                    </>}
                                </FrontCard>
                                <BackCard isCardFlipped={faSuccess}>
                                    <div className='flex h-full flex-col justify-between'>
                                        <Image
                                            src={demoNft}
                                            width="300"
                                            height="300"
                                            alt="NFT"
                                            className='rounded-lg'
                                        />
                                        <div className='flex justify-between  divide-x'>
                                            <a
                                                target={'_blank'}
                                                className="py-2 w-1/2  bg-white text-black text-center rounded-tl-full  rounded-bl-full"
                                                href={`https://goerli.etherscan.io/tx/${famsData?.hash}`}>
                                                Etherscan
                                            </a>
                                            <a
                                                target={'_blank'}
                                                className="py-2  w-1/2  bg-white text-black text-center rounded-tr-full  rounded-br-full"
                                                href={`https://testnets.opensea.io/assets/goerli/${faData?.to}`}
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
            </div>
            <ToastContainer />
        </div>
    )
}

