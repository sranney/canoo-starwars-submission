import { createGlobalStyle } from 'styled-components'
import type { AppProps } from 'next/app'

const GlobalStyles = createGlobalStyle`
  body {
    height: 100vh;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
