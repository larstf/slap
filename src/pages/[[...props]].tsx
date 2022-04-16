import { AnimatePresence } from 'framer-motion';
import type { NextPage, NextPageContext } from 'next';
import { useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';
import router from 'next/router';

import { Bear, NextHead, Navbar, Modal } from '../components';
import GlobalContext from '../context/global';
import { generateRandomString, redirect } from '../lib/utils';
import { Bear as BearInterface } from '../types/game';
import modals from '../modals.json';
import { getCookie, setCookie } from '../lib/cookie';
import axios from 'axios';

interface Props {
  page?: string,
  user?: any,
}

const Index: NextPage<Props> = ({ page, user }) => {
  const global = useContext(GlobalContext);
  const [bears, setBears] = useState<BearInterface[]>([]);
  const [playCoinSound] = useSound('/assets/sounds/coin.wav');

  useEffect(() => {
    addBear();    
  }, []);

  useEffect(() => {
    if (page) {
      global.update({
        modal: {
          open: true,
          type: page,
        }
      });
    }

    if (router.query.token)
      router.replace('/');

    if (user) {
      setCookie('token', user.token);
      global.update({
        user,
        coins: user.statistics.coins,
        xp: user.statistics.xp,
      });
    } else {
      global.update({
        modal: {
          open: true,
          disable_close: true,
          type: 'settings',
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  const addBear = () => {
    setBears((b) => [...b, {
      left: Math.floor(Math.random() * (90 - 10 + 1) + 10),
      top: Math.floor(Math.random() * (90 - 10 + 1) + 10),
      id: generateRandomString(5),
    }]);
  }

  const removeBear = (id: string) => {
    setBears((b) => [...b.filter((b) => b.id !== id)]);
  }

  const bearClicked = async (id: string) => {
    removeBear(id);
    addBear();

    if (global.user) {
      try {
        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/slap/@me/coins`, {}, {
          headers: {
            Authorization: `Bearer ${global.user?.token}`,
          }
        });

        global.update({ coins: data.coins, xp: data.xp });
      } catch (e) {}
    } else {
      global.update({ coins: global.coins + 1, xp: global.xp + 1 });
    }

    if (global.user?.settings.sound)
      playCoinSound();
  }

  return (
    <>
      <NextHead />
      <Navbar />

      {global.user && (
        <>
          <div className="absolute top-16 left-0 w-full" style={{ height: `calc(100% - 4rem)` }}>
            <div className="relative top-0 left-0 w-full h-full">
              <AnimatePresence>
                {bears.map((bear) => 
                  <Bear  
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: .2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .2 }}
                    key={bear.id} 
                    {...bear} 
                    onBearClick={bearClicked} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {global.modal.open && 
          <Modal handleClose={() => global.update({ modal: { open: false } })} type={global.modal.type} />}
      </AnimatePresence>
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { props } = ctx.query;

  const data: { [k: string]: any } = {};

  if (props) {
    const page = (props as string[])[0]?.toLowerCase();

    if (page && modals.find((m) => m.type === page && m.url)) {
      data.page = page;
    }
  }  

  const token = getCookie('token', ctx.req) || ctx.query.token;
  if (token) {
    try {
      const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slap/@me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      data.user = user;
    } catch (e) {}
  }

  if (!token || !data.user)
    redirect('/welcome', ctx.res);

  return {
    props: {
      ...data,
    }
  };
}

export default Index;
