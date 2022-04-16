import { useContext } from 'react';
import router from 'next/router';

import { icons } from '../assets';
import GlobalContext from '../context/global';

interface Props {
  hide?: boolean,
}

const Navbar: React.FC<Props> = ({ hide }) => {
  const global = useContext(GlobalContext);

  const openSettingsModal = () => {
    global.update({ modal: { open: true, type: 'settings' } });
    router.replace('/settings');
  }

  return (
    <header className="w-100 h-16 flex items-center justify-between px-10 z-10">
      <div>
        {!hide && (
          <>
            Coins: {global.coins}
          </>
        )}
      </div>
      <div>
        <div 
          onClick={() => openSettingsModal()}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200">
          <icons.cog className="fill-gray-800" width="25px" height="25px" />
        </div>
      </div>
    </header>
  )
}

export default Navbar;