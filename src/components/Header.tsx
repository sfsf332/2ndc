import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../assets/logo_2ndc.png'


export default function Header() {
    const router = useRouter()

    return (
        <div className="py-2" >
            <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8 flex justify-between h-12 items-center">


                <nav className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4 text-white  text-sm ">
                            <a
                                onClick={() => router.push('/')}
                                className={" px-1.5 py-2"}>
                                <Image src={Logo} width={60} alt={""} />
                            </a>
                            <div className="flex flex-row items-center ">
                                <a
                                    onClick={() => router.push('/ticket')}
                                    className={(router.asPath === '/ticket' ? 'text-red' : ' text-white ') + " px-1.5 py-2  cursor-pointer hover:text-red "}>
                                    Passport
                                </a>
                            </div>
                            <div className="flex flex-row  items-center">
                                
                                <button className="px-1.5 py-2 rounded-md text-sm font-medium hover:text-red cursor-pointer  ">
                                    Social
                                </button>
                            </div>
                            <div className="flex flex-row  items-center">
                                <button className="px-1.5 py-2 rounded-md text-sm font-medium hover:text-red cursor-pointer ">
                                    Docs
                                </button>
                            </div>
                        </div>
                    </div>


                </nav>
                <button>button</button>
            </div>
        </div>)
}