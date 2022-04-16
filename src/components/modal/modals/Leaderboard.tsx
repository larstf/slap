import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getCookie } from '../../../lib/cookie';
import Spinner from '../../Spinner';

interface LeaderboardEntry {
  level: number,
  user: {
    id: string,
    username: string,
    discriminator: string,
    avatar_url: string
  }
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slap/leaderboard`, {
          headers: {
            Authorization: `Bearer ${getCookie('token', null)}`,
          }
        });

        setLeaderboard(data);
      } catch (e) {}
    }

    loadLeaderboard();
  }, []);

  const getColor = (i: number) => {
    if (i === 0)
      return 'text-yellow-500';

    if (i === 1) 
      return 'text-silver';

    if (i === 2)
      return 'text-bronze';

    return 'text-secondary';
  }

  return (
    <div className="p-4 pt-0">
      {leaderboard ? (
        <div className="flex items-center w-full">
          <AnimatePresence>
            {leaderboard.map((l, i) => 
              <motion.div 
                key={l.user.id}
                className="flex mb-2 items-center justify-between w-full pr-2 hover:bg-gray-100 transition ease-in-out p-2 rounded-md">
                <div className="flex items-center">
                  <span className={`mr-3 ${getColor(i)}`}>#{i + 1}</span>
                  <Image 
                    width="35px"
                    className="rounded-full"
                    height="35px"
                    unoptimized
                    alt="Discord Avatar"
                    src={l.user.avatar_url}
                    />
                  <span className="ml-2 text-primary font-medium text-base">
                    {l.user.username}
                    <span className="text-xs text-secondary font-light">
                      #{l.user.discriminator}
                    </span>
                  </span>
                </div>
                <div>
                  lvl. {l.level}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Leaderboard;