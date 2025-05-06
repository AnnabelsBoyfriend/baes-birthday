'use client';

import { useState, useEffect } from 'react';

const cutePrizes = [
  "Kiss 💋",
  "Cuddle 🐻",
  "Massage 💆",
  "Netflix 📺",
  "Ear Picking 👂",
  "TikTok 📱",
  "Golf Battle ⛳",
];

const dirtyPrizes = {
  foreplay: [
    "Light touching 👀",
    "Body Massage 💆🏻‍♀️",
    "Inner thigh rub 😳",
    "Strip One Piece 👗",
    "Strip Tease 🫦",
    "Kiss everywhere but... 😈",
    "Lap sitting 💺",
    "Staring Contest 👁️‍🗨️",
    "Suck on fingers 😮‍💨",
    "Write name with kisses ✍️",
    "Lick but don’t kiss 👅",
    "Eat you out 😋",
    "Blow me 🎈",
    "Sixty-Nine 69 🛏️",
    "Footjob 🦶🏻",
    "Titjob 🌡️"
  ],
  sex: [
    "Missionary 😏",
    "Cowgirl 🎠",
    "Reverse Cowgirl 🔄🐎",
    "Doggy 🐕",
    "Sideways 🛌",
    "Against Wall/Table 🧱",
    "Legs on Shoulders 🦵",
    "Ballerina 🩰",
    "Flat Doggy 😯",
    "Lotus 🪷",
    "Sideway Missionary 🥵",
    "Pretzel 🥨",
  ],
};

export default function SlotMachinePage() {
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState('');
  const [isDirtyMode, setIsDirtyMode] = useState(false);
  const [dirtyType, setDirtyType] = useState<'foreplay' | 'sex'>('foreplay');
  const [usedPrizes, setUsedPrizes] = useState<string[]>([]);

  const fullPrizePool = isDirtyMode ? dirtyPrizes[dirtyType] : cutePrizes;
  const availablePrizes = isDirtyMode
    ? fullPrizePool.filter(p => !usedPrizes.includes(p))
    : fullPrizePool;

  const handleSpin = () => {
    if (spinning || availablePrizes.length === 0) return;
    setResult('');
    setSpinning(true);

    const spinPool = [...availablePrizes]; // snapshot at start of spin

    let count = 0;
    const maxCount = 20;
    const interval = setInterval(() => {
      const random = spinPool[Math.floor(Math.random() * spinPool.length)];
      setCurrent(random);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        setResult(random);
        setSpinning(false);
        if (isDirtyMode) {
          setUsedPrizes(prev => [...prev, random]);
        }
      }
    }, 100);
  };

  useEffect(() => {
    setCurrent(isDirtyMode ? '🔥' : '💘');
    setResult('');
    setUsedPrizes([]);
  }, [isDirtyMode, dirtyType]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 transition-colors duration-500 ${
        isDirtyMode ? 'bg-black text-white' : 'bg-pink-50 text-black'
      }`}
    >
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        {isDirtyMode ? 'Spin the Spicy Slot' : 'Spin the Slot Machine'}
      </h1>

      <button
        onClick={() => setIsDirtyMode(!isDirtyMode)}
        className="mb-6 px-4 py-2 text-sm text-pink-600 border border-pink-300 rounded-full hover:bg-pink-100 transition"
      >
        {isDirtyMode ? 'Switch to Cute Mode 💖' : 'Switch to Dirty Mode 🔥'}
      </button>

      {isDirtyMode && (
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setDirtyType('foreplay')}
            className={`px-4 py-2 rounded-full text-sm transition ${
              dirtyType === 'foreplay'
                ? 'bg-pink-600 text-white'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-600'
            }`}
          >
            Foreplay 🥵
          </button>
          <button
            onClick={() => setDirtyType('sex')}
            className={`px-4 py-2 rounded-full text-sm transition ${
              dirtyType === 'sex'
                ? 'bg-pink-600 text-white'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-600'
            }`}
          >
            Sex 😈
          </button>
        </div>
      )}

      <div
        className={`rounded-xl shadow-lg border-4 w-72 h-24 flex items-center justify-center text-xl font-bold text-center px-2 transition-colors duration-500 ${
          isDirtyMode
            ? 'bg-zinc-900 border-zinc-700 text-white'
            : 'bg-white border-pink-300 text-pink-700'
        }`}
      >
        {current || '💘'}
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning || (isDirtyMode && availablePrizes.length === 0)}
        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full text-lg shadow hover:bg-pink-600 disabled:opacity-50"
      >
        {spinning
          ? 'Spinning...'
          : isDirtyMode && availablePrizes.length === 0
          ? 'No more! 🔁 Refresh'
          : 'Spin 💘'}
      </button>
    </div>
  );
}
