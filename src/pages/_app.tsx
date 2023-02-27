import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import App from 'next/app'
import i18n from "i18next";
import { I18nextProvider } from 'react-i18next';
import "../locales/i18n";
import Header from '@/components/Header';
import localFont from '@next/font/local';

const myFont = localFont({ src: '../assets/BlockZone.ttf' })
class MyApp extends App {
  
  render() {
    const { Component, pageProps } = this.props
    return (
      <I18nextProvider i18n={i18n}>
        <main className={myFont.className + ' w-full h-[100vh] flex flex-col bg-[#000] overflow-hidden text-white '}>
            <div className="py-2" >
                <Header />
                <Component {...pageProps} />
            </div>
          </main>
      </I18nextProvider>

    )
  }
}
export default MyApp
