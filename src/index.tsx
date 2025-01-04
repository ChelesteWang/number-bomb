import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBomb } from 'react-icons/fa';

interface Props {
  onRestart: () => void;
}

const NumberBomb: React.FC<Props> = ({ onRestart }) => {
  const [bomb] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [showBomb, setShowBomb] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const bombIconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 1
        }
      }
    },
    explode: {
      scale: [1, 4, 0],
      opacity: [1, 1, 0],
      rotate: [0, 360, 720],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setIsExploding(true);
    }
  }, [gameOver]);

  const isInRange = (num: number) => {
    return num >= minRange && num <= maxRange;
  };

  const handleNumberClick = (num: number) => {
    if (num === bomb) {
      setGameOver(true);
      return;
    }

    if (!isInRange(num)) {
      setShowBomb(false);
      setTimeout(() => setShowBomb(true), 1000);
      return;
    }

    if (num < bomb) {
      setMinRange(num + 1);
    } else {
      setMaxRange(num - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg">
        <div className="text-[20px] font-bold text-gray-700">初恋糖大小姐的数字炸弹</div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold text-gray-700">
            范围: {minRange} - {maxRange}
          </div>
          <AnimatePresence>
            {showBomb && !isExploding && (
              <motion.div
                variants={bombIconVariants}
                initial="initial"
                whileHover="hover"
                className="text-red-500 text-2xl cursor-pointer"
              >
                <FaBomb />
              </motion.div>
            )}
            {isExploding && (
              <motion.div
                className="text-red-500 text-2xl"
                variants={bombIconVariants}
                initial="initial"
                animate="explode"
                onAnimationComplete={() => setIsExploding(false)}
              >
                <div className="relative">
                  <FaBomb />
                  <motion.div
                    className="absolute inset-0 bg-yellow-400 rounded-full mix-blend-screen"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 6],
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-red-500 rounded-full mix-blend-screen"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 5],
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.1,
                      ease: "easeOut"
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-10 gap-4">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <motion.button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={gameOver}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                aspect-square relative flex items-center justify-center transition-colors
                ${!isInRange(num)
                  ? 'opacity-50 cursor-not-allowed'
                  : num === bomb && gameOver
                    ? 'text-red-500'
                    : 'text-gray-700 hover:text-red-500'
                }
              `}
            >
              <div className="relative w-full h-full">
                <FaBomb className="w-full h-full p-1" />
                <div style={
                  {
                    left: '-7.5px',
                    top: '7px'
                  }
                } className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  {num}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <div className="text-2xl font-bold text-red-500 mb-4 flex items-center justify-center gap-2">
              <span>💥</span>
              游戏结束！炸弹数字是 {bomb}
              <span>💥</span>
            </div>
            <button
              onClick={onRestart}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              重新开始
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NumberBomb;