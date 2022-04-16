import { motion } from 'framer-motion';
import router from 'next/router';

import { icons } from '../../assets';
import Backdrop from './Backdrop';
import Settings from './modals/Settings';
import modals from '../../modals.json';
import { useContext } from 'react';
import GlobalContext from '../../context/global';
import WelcomeModal from './modals/Welcome';
import Leaderboard from './modals/Leaderboard';

const dropIn = {
  hidden: {
    scale: .9,
    opacity: 0,
  },
  exit: {
    scale: .9,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const Modal: React.FC<{ handleClose: any, type: string }> = ({ handleClose, type }) => {
  const global = useContext(GlobalContext);

  const onClose = async () => {
    if (global.modal.disable_close)
      return;

    router.replace('/');
    if (handleClose)  
      handleClose();
  }
    
  return (
    <Backdrop onClick={() => onClose()}>
      <motion.div
        onClick={(e) => e.stopPropagation()}  
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-max mx-2 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div className="flex w-full items-center justify-between p-4">
          <h3 className="font-semibold text-lg text-primary">
            {modals.find((m) => m.type === type)?.name}
          </h3>
          <div
            onClick={() => onClose()}
            className="w-8 h-8 -mr-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200">
            <icons.x className="stroke-gray-600" width="20" height="20" />
          </div>
        </div>
        
        {type === 'settings' && <Settings />}
        {type === 'welcome' && <WelcomeModal />}
        {type === 'leaderboard' && <Leaderboard />}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
