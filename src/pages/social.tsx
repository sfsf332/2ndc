import localFont from '@next/font/local'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import LogoDiscord from '../assets/icon_discord.png'
import LogoTwitter from '../assets/icon_twitter.png'


export default function Social() {
    const { t, i18n } = useTranslation();


    return (

        <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
            <div className=' w-full min-h-screen mx-auto'>
                <div className="w-[1080px] h-full mx-auto">
                    <h1 className='text-2xl py-8'>{t('social_title')}</h1>
                    <p className=' py-2'>{t('social_intro')}</p>
                    <p className=' py-2'>{t('social_intro1')}</p>
                    <div className='flex  mt-12'>
                        <div className="  w-[30%] mx-0 bg-[#0f0e0e]  md:py-10  md:px-10 rounded-2xl  text-base ">
                            <div className="w-full text-base" >
                                <h2 className='text-xl py-2 flex justify-between pb-16'>
                                    <span>Discrod</span>
                                    <Image src={LogoDiscord} alt="discord" width={32} height={32} />
                                </h2>

                                <button className="py-2 mx-auto bg-white flex justify-between px-8  text-black rounded-full">
                                    <a href="https://discord.com/invite/qxgUY2B5Wd" target="_blank" className='hover:text-red'>Join Discord</a>
                                </button>
                            </div>

                        </div>

                        <div className="  w-[30%] mx-0 bg-[#0f0e0e]  md:py-10  md:px-10 rounded-2xl  text-base ml-10 ">
                            <div className="w-full text-base" >
                                <h2 className='text-xl py-2 flex justify-between pb-16'>
                                    <span>Twitter</span>
                                    <Image src={LogoTwitter} alt="twitter" width={32} height={32} />
                                </h2>

                                <button className="py-2 mx-auto bg-white flex justify-between px-8  text-black rounded-full">
                                <a href="https://twitter.com/2ndcxyz" target="_blank" className='hover:text-red'>Follow Us</a>
                                </button>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

