import { AppProps } from 'next/app'
import "../app/globals.css"

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}