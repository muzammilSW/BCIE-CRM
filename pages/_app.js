import "@/styles/globals.css";
import "@/styles/Editor.css";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


export default function App({ Component, pageProps: { session, ...pageProps } }) {

  // console.log(pageProps);

  return <SessionProvider session={session}>
    <Toaster />
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Component {...pageProps} />
    </LocalizationProvider>
  </SessionProvider>
}
