import Image from 'next/image';
import { HTMLMotionProps, motion } from 'framer-motion';

import config from '../config.json';

interface Props extends HTMLMotionProps<"div"> {
  left: number,
  id: string,
  top: number,
  onBearClick: (id: string) => void,
}

const Bear: React.FC<Props> = ({ left, top, onBearClick, id, ...props }) => {
  const styles = { 
    left: `${left}%`, 
    top: `${top}%`,
    height: `${config.dimensions}px`,
    width: `${config.dimensions}px`,
  };

  return (
    <motion.div 
      {...props}
      style={styles} 
      className="absolute cursor-pointer hover:shadow-md transition-shadow" 
      onClick={() => onBearClick(id)}>
      <Image 
        width={config.dimensions} 
        height={config.dimensions} 
        src="/assets/images/ice_bear_image.png" 
        alt="Ice Bear" />
    </motion.div>
  )
}

export default Bear;