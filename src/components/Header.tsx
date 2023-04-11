import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../assets/logo_2ndc.png'
import { useTranslation } from "react-i18next";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Web3ConnectButton } from './Web3ConnectButton';


export default function Header() {
    const router = useRouter()
    const { t, i18n } = useTranslation();

    return (
        <div className="py-2" >
            <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8 flex justify-between h-12 items-center">


                <nav className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4 text-white  text-sm  ">
                            <a
                                onClick={() => router.push('/')}
                                className=" px-1.5 py-2  cursor-pointer">
                                <Image src={Logo} width={60} alt={""} />
                            </a>
                            <div className="flex flex-row items-center ">
                                <a
                                    onClick={() => router.push('/passport')}
                                    className={(router.asPath === '/passport/' ? 'text-red' : ' text-white ') + " px-1.5 py-2  cursor-pointer hover:text-red "}>
                                    {t('nav_passport')}
                                </a>
                            </div>
                            <div className="flex flex-row  items-center">
                                <a
                                    onClick={() => router.push('/social')}
                                    className={(router.asPath === '/social/' ? 'text-red' : ' text-white ') + " px-1.5 py-2  cursor-pointer hover:text-red "}>
                                    {t('nav_social')}
                                </a>
                                
                            </div>
                            <div className="flex flex-row  items-center">
                                <a 
                                className="px-1.5 py-2 rounded-md text-sm font-medium hover:text-red cursor-pointer " 
                                href='https://2ndc.notion.site/ec8a2cf0d47b49ea92fd8faaf8b6f620'
                                 target={'_blabk'}>
                                    {t('nav_docs')}
                                </a>
                            </div>
                        </div>
                    </div>


                </nav>
                
                <button className='mr-2' onClick={() => {
                    (i18n.language === 'en') ?
                        i18n.changeLanguage("zh")
                        :
                        i18n.changeLanguage("en")
                }}>{t('change_lang')}</button>
               <Web3ConnectButton />
            </div>
        </div>)
}