'use client';

import { useState } from 'react';

export default function LoveMeterPage() {
  const [love, setLove] = useState(50);
  const [message, setMessage] = useState('');

  const checkLove = () => {
    if (love === 100) {
      setMessage("Correct answer 🥰 I love you too!");
    } else if (love > 75) {
      setMessage("Almost... but you can do better 😤");
    } else if (love > 50) {
      setMessage("Not bad... 😶‍🌫️ but try again.");
    } else if (love > 30) {
        setMessage("Uh not okay... stop playing 🙄");
    } else if (love > 20) {
        setMessage("Nah Nah Nah... ❌❌❌");
    } else {
      setMessage("EXCUSE ME??? 😡 Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">How much do you love me? 💘</h1>

      <input
        type="range"
        min={0}
        max={100}
        value={love}
        onChange={(e) => setLove(Number(e.target.value))}
        className="w-full max-w-md mb-4 accent-pink-500"
      />
      <div className="text-xl font-semibold text-pink-700 mb-6">{love}%</div>

      <button
        onClick={checkLove}
        className="bg-pink-500 text-white px-6 py-2 rounded-full text-lg shadow hover:bg-pink-600 transition"
      >
        Check Answer 💌
      </button>

      {message && (
        <p className="mt-6 text-lg text-gray-700 max-w-md">{message}</p>
      )}
    </div>
  );
}
