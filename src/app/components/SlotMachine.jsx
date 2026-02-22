import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

// Import all your images
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img11 from './images/11.jpg';
import img12 from './images/12.jpg';
import img13 from './images/13.jpg';
import img14 from './images/14.jpg';
import img15 from './images/15.jpg';
import img16 from './images/16.jpg';
import img21 from './images/21.jpg';
import img22 from './images/22.jpg';
import img23 from './images/23.jpg';
import img24 from './images/24.jpg';
import img25 from './images/25.jpg';
import img26 from './images/26.jpg';

const RANDOM_IMAGES = [
  [img1, img2, img3, img4, img5, img6],
  [img11, img12, img13, img14, img15, img16],
  [img21, img22, img23, img24, img25, img26],
  [img1, img2, img3, img4, img5, img6],
  [img11, img12, img13, img14, img15, img16],
  [img21, img22, img23, img24, img25, img26],
];

const USE_IMAGES = true;
const DEAD_SPINS = 2; // First 2 spins show no words

export function SlotMachine() {
  const targetWords = ['WILL', 'YOU', 'BE', 'MY', 'VALENTINE', '?'];
  const [reels, setReels] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showYesNo, setShowYesNo] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noText, setNoText] = useState('No');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [nextWordIndex, setNextWordIndex] = useState(0); // Track which word to reveal next

  const noButtonTexts = [
     'nahh?', 'wrong answer', 'noooo', 'pretty pls',
    'araw mo', 'awww', 'awit',
  ];

  useEffect(() => {
    const initialReels = targetWords.map((word, index) => ({
      id: index,
      targetWord: word,
      currentWord: USE_IMAGES 
        ? RANDOM_IMAGES[index][0]
        : '❤️',
      isRevealed: false,
      isSpinning: false,
    }));
    setReels(initialReels);
  }, []);

  const getRandomItem = (reelIndex) => {
    if (USE_IMAGES) {
      const images = RANDOM_IMAGES[reelIndex];
      return images[Math.floor(Math.random() * images.length)];
    } else {
      const emojis = ['❤️', '💖', '💕', '💘', '💝', '💗'];
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
  };

  const spinSlots = () => {
    if (isSpinning || completed) return;
    
    setIsSpinning(true);
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);

    setReels(prevReels =>
      prevReels.map(reel => ({ ...reel, isSpinning: true }))
    );

    const spinInterval = setInterval(() => {
      setReels(prevReels =>
        prevReels.map(reel =>
          reel.isRevealed
            ? reel
            : { ...reel, currentWord: getRandomItem(reel.id) }
        )
      );
    }, 100);

    reels.forEach((reel, index) => {
      setTimeout(() => {
        clearInterval(spinInterval);
        
        setReels(prevReels =>
          prevReels.map((r, i) => {
            if (i !== index) return r;
            
            let shouldReveal = false;
            
            // First 2 spins: NO words revealed (dead spins)
            if (newSpinCount > DEAD_SPINS) {
              // After dead spins, reveal words IN ORDER
              // If this reel matches the next word to reveal
              if (i === nextWordIndex && !r.isRevealed) {
                shouldReveal = true;
                setNextWordIndex(prev => prev + 1); // Move to next word
              }
            }

            return {
              ...r,
              isSpinning: false,
              isRevealed: shouldReveal || r.isRevealed,
              currentWord: shouldReveal || r.isRevealed ? r.targetWord : getRandomItem(r.id),
            };
          })
        );

        if (index === reels.length - 1) {
          setTimeout(() => {
            setReels(prevReels => {
              const allRevealed = prevReels.every(r => r.isRevealed);
              if (allRevealed) {
                setCompleted(true);
                setTimeout(() => {
                  setShowYesNo(true);
                }, 1000);
              }
              return prevReels;
            });
            setIsSpinning(false);
          }, 300);
        }
      }, 1000 + index * 300);
    });
  };

  const revealAll = () => {
    setReels(prevReels =>
      prevReels.map(reel => ({
        ...reel,
        isRevealed: true,
        currentWord: reel.targetWord,
        isSpinning: false,
      }))
    );
    setNextWordIndex(targetWords.length); // Mark all as revealed
    setCompleted(true);
    setTimeout(() => {
      setShowYesNo(true);
    }, 1000);
  };

  const moveNoButton = () => {
    // WIDER MOVEMENT: Can move across most of the screen
    // Use window dimensions for wider movement
    const maxX = window.innerWidth * 0.8; // 80% of screen width
    const maxY = window.innerHeight * 0.7; // 70% of screen height
    
    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = Math.random() * maxY - (maxY / 2);
    setNoPosition({ x: randomX, y: randomY });
    
    const randomIndex = Math.floor(Math.random() * noButtonTexts.length);
    setNoText(noButtonTexts[randomIndex]);
    
    setYesSize(prev => Math.min(prev + 0.2, 3));
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <motion.h1 
      
        className="text-4xl font-bold text-red-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        hello baby! welcome to my online keysino...
      </motion.h1>
      
      <p className="text-lg text-pink-600 text-center">
         the only gamble worth taking :) 
       </p>

      {/* Slot Machine */}
      <div className="relative w-full max-w-3xl">
        <div className="bg-gradient-to-b from-red-600 to-red-800 p-8 rounded-3xl shadow-2xl border-8 border-yellow-500">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-2xl shadow-inner">
            <div className="flex gap-3 justify-center">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="relative"
                >
                  <div className={`
                    bg-white rounded-lg shadow-lg overflow-hidden
                    ${reel.id === 4 ? 'w-36' : 'w-24'} h-28
                    flex items-center justify-center
                    border-4 ${reel.isRevealed ? 'border-green-500' : 'border-gray-300'}
                  `}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={reel.currentWord}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                          transition: { 
                            type: reel.isSpinning ? 'tween' : 'spring',
                            duration: reel.isSpinning ? 0.1 : 0.3,
                            bounce: 0.5
                          }
                        }}
                        exit={{ y: 100, opacity: 0 }}
                        className={`
                          font-bold text-center flex items-center justify-center w-full h-full
                          ${reel.id === 4 ? 'text-lg' : 'text-2xl'}
                          ${reel.isRevealed ? 'text-red-600' : 'text-gray-700'}
                        `}
                      >
                        {reel.isRevealed ? (
                          <span className={reel.id === 4 ? "text-lg px-1" : "text-2xl"}>
                            {reel.targetWord}
                          </span>
                        ) : USE_IMAGES ? (
                          <img 
                            src={reel.currentWord} 
                            alt="slot item" 
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                              console.error('Image failed to load:', reel.currentWord);
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '❤️';
                            }}
                          />
                        ) : (
                          <span className="text-2xl">{reel.currentWord}</span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {reel.isRevealed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lever */}
        <motion.div
          className="absolute -right-16 top-1/2 -translate-y-1/2"
          animate={isSpinning ? { rotate: [0, 20, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-4 h-32 bg-gradient-to-b from-red-700 to-red-900 rounded-full border-2 border-yellow-600"></div>
            <div className="w-12 h-12 bg-gradient-to-b from-red-600 to-red-800 rounded-full border-4 border-yellow-500 shadow-lg"></div>
          </div>
        </motion.div>
      </div>

      {/* Controls - Only Spin button */}
      <div className="flex gap-4">
        <motion.button
          onClick={spinSlots}
          disabled={isSpinning || completed}
          whileHover={{ scale: isSpinning || completed ? 1 : 1.05 }}
          whileTap={{ scale: isSpinning || completed ? 1 : 0.95 }}
          className={`
            px-8 py-4 rounded-full font-bold text-xl shadow-lg
            transition-all duration-200
            ${isSpinning || completed
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600'
            }
          `}
        >
          {isSpinning ? 'spinning...' : completed ? 'congrats!' : 'spin'}
        </motion.button>
        
      </div>
      
          {/* Yes/No Question Section */}
          {showYesNo && !yesClicked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 p-6 mt-4 w-full"
            >
              {/* CHANGED TO CURSIVE FONT */}
              <motion.h2 
                className="text-5xl font-cursive text-red-600 text-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                style={{ fontFamily: 'cursive, Brush Script MT, Brush Script Std, Lucida Handwriting, Apple Chancery, serif' }}
              >
                Will you be my Valentine?
              </motion.h2>
              
              <div className="flex gap-6 items-center relative min-h-[100px] w-full justify-center">
                {/* Yes Button */}
                <motion.button
                  onClick={handleYesClick}
                  animate={{ scale: yesSize }}
                  whileHover={{ scale: yesSize * 1 }}
                  whileTap={{ scale: yesSize * 0.95 }}
                  className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold text-xl hover:bg-pink-600 transition-colors shadow-lg flex items-center gap-2 z-10 relative"
                >
                  <span className="text-2xl"></span>
                  yes ofc
                  <span className="text-2xl"></span>
                </motion.button>
                
                {/* No Button - FIXED: Won't disappear */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ 
                    x: noPosition.x, 
                    y: noPosition.y,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 50,
                    damping: 20 
                  }}
                  className="px-6 py-3 bg-gray-400 text-white rounded-full font-bold hover:bg-gray-500 transition-colors shadow-md absolute z-20"
                  style={{ 
                    position: 'absolute',
                    cursor: 'pointer'
                  }}
                >
                  {noText}
                </motion.button>
              </div>

              
              {yesSize > .5 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-pink-600 text-center italic text-m"
                >
                come on, monthsary & valentine's date na 'to
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Yes Clicked Message */}
          {yesClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 p-6 mt-4"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="text-8xl"
              >
              
              </motion.div>
              <h2 className="text-3xl font-bold text-red-600 text-center">
                yeeyy paldoo!!
              </h2>
              <p className="text-xl text-pink-600 text-center max-w-xl">
               stay tuned for further deets, lock in muna ako acads hehe
              </p>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                
              </motion.div>
            </motion.div>
          )}
    </div>
  );
}