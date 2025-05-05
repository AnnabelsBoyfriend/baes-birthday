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

const dirtyPrizes = [
  "Missionary 😏",
  "Sixty-Nine 69 🛏️",
  "Ride 🎠",
  "Doggy 🐕",
  "10 min Makeout 😘",
  "Blow me 👄",
  "Eat you out 😋",
  "Fingering 👆🏻",
];

export default function SlotMachinePage() {
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState('');
  const [isDirtyMode, setIsDirtyMode] = useState(false);

  const prizePool = isDirtyMode ? dirtyPrizes : cutePrizes;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (spinning) {
      interval = setInterval(() => {
        const random = prizePool[Math.floor(Math.random() * prizePool.length)];
        setCurrent(random);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        const final = prizePool[Math.floor(Math.random() * prizePool.length)];
        setCurrent(final);
        setResult(final);
        setSpinning(false);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [spinning, prizePool]);

  useEffect(() => {
    setCurrent(isDirtyMode ? '🔥' : '💘');
    setResult('');
  }, [isDirtyMode]);
  

  const handleSpin = () => {
    if (!spinning) {
      setResult('');
      setSpinning(true);
    }
  };

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

      <div
  className={`rounded-xl shadow-lg border-4 w-64 h-24 flex items-center justify-center text-xl font-bold transition-colors duration-500 ${
    isDirtyMode
      ? 'bg-zinc-900 border-zinc-700 text-white'
      : 'bg-white border-pink-300 text-pink-700'
  }`}
>

        {current || '💘'}
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full text-lg shadow hover:bg-pink-600 disabled:opacity-50"
      >
        {spinning ? 'Spinning...' : 'Spin 💘'}
      </button>

    </div>
  );
}
