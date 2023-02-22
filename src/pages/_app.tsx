import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import App from 'next/app'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}
export default MyApp
