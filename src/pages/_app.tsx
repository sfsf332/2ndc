import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app'
import App from 'next/app'
import i18n from "i18next";
import { I18nextProvider } from 'react-i18next';
import "../locales/i18n";
import Header from '@/components/Header';
import localFont from '@next/font/local';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { createClient, configureChains, WagmiConfig, goerli } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);
console.log(chains)
const { wallets } = getDefaultWallets({
  appName: '2NDC',
  chains,
});

const appInfo = {
  appName: '2NDC',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const myFont = localFont({ src: '../assets/BlockZone.ttf' })
class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props

    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={appInfo} chains={chains}>
        <I18nextProvider i18n={i18n}>
          <main className={myFont.className + ' w-full h-[100vh] flex flex-col bg-[#000] overflow-hidden text-white '}>
            <div className="py-2" >
              <Header />
              <Component {...pageProps} />
            </div>
          </main>
        </I18nextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    )
  }
}
export default MyApp
