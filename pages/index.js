import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, getSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { BranchesApi } from "@/data/Endpoints/Listing";
import Layout from "@/Components/Common/Layout";
import { Button } from "@mui/material";
import { AcUnit } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const session = useSession();
  const router = useRouter()

  console.log(session);

  useEffect(() => {

    window.location.href = '/dashboard'

    // if (session?.data?.user?.role?.id == 3) {
    //   window.location.href = '/lead';
    // } else if (session?.data?.user?.role?.id == 4) {
    //   window.location.href = '/lead';
    // } else if (session?.data?.user?.role?.id == 5) {
    //   window.location.href = '/lead';
    // } else if (session?.data?.user?.role?.id == 6) {
    //   window.location.href = '/applications-unsubmitted';
    // }
    // Redirect to the new home page
  }, []);


}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  // console.log('yyy', session);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}