import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import type { NextPage, NextPageContext } from 'next';
import { useContext, useEffect } from 'react';

import { Modal, Navbar, NextHead } from '../components';
import GlobalContext from '../context/global';
import { redirect } from '../lib/utils';

const Welcome: NextPage = () => {
  const global = useContext(GlobalContext);

  useEffect(() => {
    global.update({  
      modal: {
        disable_close: true,
      }
    });

    return () => {
      global.update({  
        modal: {
          disable_close: false,
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextHead />
      <Navbar hide />

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        <Modal handleClose={() => {}} type="welcome" />
      </AnimatePresence>
    </>
  ) 
} 

export async function getServerSideProps(ctx: NextPageContext) {
  const { code } = ctx.query;

  console.log(code);
  

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/discord/callback?code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/welcome`);

    redirect(`/?token=${data.token}`, ctx.res);
  } catch (e) {}

  return {
    props: {}
  }
}

export default Welcome;