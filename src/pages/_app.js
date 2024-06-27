import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
  <ChakraProvider>
  <Toaster position="top-right" reverseOrder={false} />
  <Component {...pageProps} />
  </ChakraProvider>
  )
}