import { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import axios from 'axios';

import Toggle from '../../Toggle';
import GlobalContext from '../../../context/global';
import Image from 'next/image';
import { removeCookie, setCookie } from '../../../lib/cookie';

const Settings: React.FC = () => {
  const global = useContext(GlobalContext);
  const [config, setConfig] = useState({
    sound: global.user?.settings.sound ?? true,
    public_profile: global.user?.settings.public_profile ?? true,
  });

  const logout = () => {
    global.update({ user: undefined, modal: { ...global.modal } });
    removeCookie('token');
    router.push('/welcome');
  }

  const updateConfig = async (newConfig: any) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/slap/@me`, newConfig, {
        headers: {
          Authorization: `Bearer ${global.user?.token}`,
        }
      });

      setConfig((c) => Object.assign({}, c, newConfig));
      global.update({
        user: {
          ...global.user,
          settings: Object.assign({}, config, newConfig),
        }
      })
    } catch (e) {}
  }

  return (
    <div className="p-4 pt-0">
      {!global.user ? (
        <></>
      ) : (
        <>
          <div className="flex w-full justify-between items-center">
            <div>
              <p className="font-normal text-primary">Sound</p>
              <p className="text-sm text-secondary">Hallo Welt</p>
            </div>
            <div>
              <Toggle 
                value={config.sound} 
                onChange={() => updateConfig({ sound: !config.sound })} />
            </div>
          </div>

          <hr className="my-5" />

          <h3 className="mb-2 text-lg">Discord</h3>

          <div className="flex w-full justify-between items-center">
            <div>
              <p className="text-primary">Authorized as</p>
            </div>
            <div className="flex items-center">
              <Image 
                width="25px"
                height="25px"
                unoptimized
                className="rounded-full"
                alt="Discord Avatar"
                src={global.user.discord.avatar_url}
                />
              <p className="text-primary ml-2">
                {global.user.discord.username}
                <span className="text-secondary text-sm">
                  #{global.user.discord.discriminator}
                </span>
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex w-full justify-between items-center">
            <div>
              <p className="text-primary">Public Profile</p>
              <p className="text-sm text-secondary">
                Anyone can see your profile and statistics
              </p>
            </div>
            <div>
              <Toggle 
                value={config.public_profile} 
                onChange={() => updateConfig({ public_profile: !config.public_profile })} />
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export default Settings;