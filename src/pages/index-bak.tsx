

import {
    useParallax, Parallax, ParallaxBanner, ParallaxBannerLayer
  } from "react-scroll-parallax";
  import Image from 'next/image';
  import Logo from '../assets/logo.png'
  import LogoTwitter from '../assets/logo_twitter.png'
  import LogoDiscord from '../assets/logo_discord.png'
  import LogoShip from '../assets/logo_ship.png'
  import ArrowDown from '../assets/icon_down.png'
  import localFont from '@next/font/local'
  import { useEffect, useRef, useState } from 'react';
  
  const myFont = localFont({ src: '../assets/Aurebesh-English.ttf' })
  
  export default function Home() {
    const resource = [{
      src: '/2ndc.mp4',
    }
    ]
    const videoRef = useRef<HTMLVideoElement>(null);
    const target = useRef(null);
    const loadingVideo = () => {
  
      if (videoRef && videoRef.current) {
        videoRef.current.muted = false
        // videoRef.current.play();
      }
    }
    let [muted,setMuted] = useState(true)
    useEffect(() => {
      
      if(!muted){return}
     
        window.addEventListener('scroll', ()=>{
          loadingVideo()
        });
       
      
    })
    return (
  
  
      <main  onClick={loadingVideo}>
        <>
          <div className="relative h-screen overflow-hidden" ref={target}>
            <div className="custom-bg z-0 absolute pointer-events-none h-screen w-screen">
              <Parallax speed={25} >
                <video
                  src="/2ndc.mp4"
                  className=' w-screen'
                  //  onLoad={loadingVideo} 
                  // onLoad={() => loadingVideo}
                  loop={false}
                  controls={false}
                  preload="auto"
                  autoPlay={true}
                  muted
                  ref={videoRef}
                ></video>
              </Parallax>
              {/* <img src="http://www.fillmurray.com/500/320" alt="fill murray" /> */}
            </div>
            <div className='absolute z-1 w-full flex flex-col h-full justify-between  text-white ' onClick={loadingVideo}>
              <Parallax
                translateY={[-200, 300]}
                easing="easeInQuad" >
                <div className='flex w-full  justify-between  px-4 py-6 h-[100px] bg-[rgba(0,0,0,0.3)]'>
                  <Image src={Logo} alt={'logo'} height={40} />
                  <nav>
                    <a>PASS</a>
                    <a>FAQ</a>
                    <a>MINT</a>
                  </nav>
                </div>
              </Parallax>
              <Parallax
                scale={[1, 0]}
                easing="easeInQuad" >
                <div className='main_info'>
                  <h2 className={myFont.className}>2NDC</h2>
                  <div className='flex w-full justify-between items-center'>
                    <h6>Phase 0</h6>
                    <div>
                      <h3 className='text-3xl pb-4'>专注挖掘Alpha机会</h3>
                      <p className='text-lg'>写给散户看的投研报告 + 详细可执行的SOP指引  持续跟踪更新项目动态</p>
                    </div>
                    <h5 className={myFont.className}>monolith</h5>
                  </div>
                </div>
              </Parallax>
              <Parallax
                opacity={[1, 0.3]}
                easing="easeInQuad" >
                <div className='flex w-full justify-between items-center border-box bg-[rgba(0,0,0,0.8)]'>
                  <div className='left_box px-10 py-6 h-full'>
                    <Image src={ArrowDown} alt={'arrow'} width={20} />
                  </div>
                  <div className='flex w-[300px] h-full justify-between px-10 py-6 '>
                    <a><Image src={LogoTwitter} alt={'logo'} height={32} /></a>
                    <a><Image src={LogoDiscord} alt={'logo'} height={32} /></a>
                    <a><Image src={LogoShip} alt={'logo'} height={32} /></a>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
          <div className="relative h-screen overflow-hidden">
  
            <div className='flex flex-col h-screen text-yellow '>
              <div className='flex w-full flex-grow justify-between items-center'>
                <div className='left_box px-10 py-6 h-full'>
  
                  <h6>Phase 0</h6>
                  <h3 className={myFont.className + ' text-3xl mt-6'}>"ABOUT"</h3>
                </div>
                <div className='flex flex-1 h-full  flex-col text-2xl justify-between px-10 py-6'>
                  <p>马后炮、然并卵、夹私货并称研究报告3大通病。什么火写什么、谁给钱写谁、看完一头雾水的你，根本不知道有什么用。</p>
                  <p>  二等舱，要改变这些。</p>
                  <p>我们不一样，二等舱只专注挖掘市面上没怎么看到的Alpha机会。更重要的，我们会告知机会在哪里、如何操作。空投、挖矿、打新、冲白，这些才是散户们应该看到的研究报告。</p>
                  <p>你们久等了。</p>
                  <p>但，这只是二等舱的起始篇章，故事刚开始。</p>
                </div>
              </div>
              <div className={myFont.className + ' h-[148px] leading-[148px] text-center text-[66px] border-y border-solid  border-y-gold  line-clamp-1'}>WELCOME ABOARD, captain</div>
            </div>
  
          </div>
          <div className="relative h-screen overflow-hidden ships">
            <div className='flex w-full h-screen  flex-grow justify-between items-center text-yellow '>
              <div className='left_box px-10 py-6 h-full'>
  
                <h3 className={myFont.className + ' text-3xl mt-6'}>gENESIS pass</h3>
              </div>
              <div className="flex-1 h-full ship_box relative">
  
                <img src="https://s1.imagehub.cc/images/2023/02/16/4186cfd697b88bd990a7bc71dfc6ee63.png" className="absolute m-auto top-0 bottom-0 left-0 right-0" width="762" alt={""} />
                <img src="https://s1.imagehub.cc/images/2023/02/16/f53a1cbca18e284c82f6b2cf36b0b564.png" className="absolute m-auto top-0 bottom-0 left-0 right-0" width="642" alt={""} />
                <Parallax
                  opacity={[0, 1]}
                  className="absolute m-auto top-0 bottom-0 left-0 right-0 w-[820px] h-[820px]"
                 >
                  <img src="https://s1.imagehub.cc/images/2023/02/16/26438559072576ea7ea4d6da5457cc27.png"  width="820" alt={""} />
                </Parallax>
              </div>
  
  
            </div>
  
          </div>
        </>
  
  
  
  
      </main>
  
    )
  }
  
  