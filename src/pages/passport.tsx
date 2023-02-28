import localFont from '@next/font/local'
import { useTranslation } from 'react-i18next';


export default function Ticket() {
    const { t, i18n } = useTranslation();

    const switchPrice = (index: number) => {
        switch (index) {
            case 1:
                return '0.4 E'
            case 2:
                return '0.25 E'
            case 3:
                return t('label_freemint')
        }
    }
    return (
        
            <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  ">
                <div className=' w-full min-h-screen mx-auto'>
                    <div className="w-[1080px] h-full mx-auto">
                        <h1 className='text-2xl py-8'>{t('passport_title')}</h1>
                        <p className=' py-2'>{t('passport_subtitle')}</p>
                        <p className=' py-2'>{t('passport_link_intro')}<a href="#">{t('passport_link_text')}</a></p>
                        <div className='flex justify-between pt-0 mt-12'>
                            {[1, 2, 3].map((item, index) => {
                                return (
                                    <div className="  w-[30%] mx-0 bg-[#0f0e0e]  md:pb-10 md:pt-4  md:px-10 rounded-2xl  text-base ">
                                        <div className="w-full text-base" >
                                            <p className='text-right text-red text-sm'>{0+''+item}</p>
                                            <h2 className='text-xl py-2 pt-6'>{t('passport_title_type'+item)}</h2>
                                            {/* <h3 className=' py-1 underline decoration-wavy text-red'>功能描述&nbsp;&nbsp;</h3> */}
                                            <ul className='text-sm leading-[1.6rem] mt-4'>
                                                <li className='text-sm py-2'>- {t('passport_intro1_type'+item)}</li>
                                                <li className='text-sm py-2'>- {t('passport_intro2_type'+item)}</li>
                                                <li className='text-sm py-2'>- {t('passport_intro3_type'+item)}</li>
                                                <li className='text-sm py-2'>- {t('passport_intro4_type'+item)}</li>
                                            </ul>
                                            <p className='flex justify-between mt-8'>
                                                <span className='text-sm'>- {t('label_progress')}</span>
                                                <span>{item>1?'Checking':'222/321'}</span>
                                            </p>
                                            <button className="py-2 mx-auto bg-white flex justify-between px-8 mt-8 text-black rounded-full">
                                                <span className='text-red mr-2'>-</span>
                                              
                                                <span>
                                                    {switchPrice(item)}
                                                </span>
                                                <span className='text-red  ml-2'>  -</span>
                                            </button>
                                        </div>

                                    </div>
                                )
                            })}



                        </div>
                    </div>
                </div>

       </div>
    )
}

