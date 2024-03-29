import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import ShopProvider from '@/context/shopContext'
import { AuthProvider } from '../context/AuthContext'
import { ThemeProvider } from 'next-themes'
import { AddressProvider } from '@/context/AddressContext'



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return( 
    <AuthProvider>
      <AddressProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <ShopProvider>
            <Layout>
              <Component {...pageProps} key={router.asPath}/>
            </Layout>
          </ShopProvider>
        </ThemeProvider>
      </AddressProvider>
    </AuthProvider>
  )
}
