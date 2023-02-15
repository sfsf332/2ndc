import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import App from 'next/app'
import {
  ParallaxProvider,

} from "react-scroll-parallax";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (<ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>)
  }
}
export default MyApp
