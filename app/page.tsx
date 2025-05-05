'use client';

import { useState, useEffect, useMemo} from 'react';
import './globals.css';
import Link from 'next/link';

const PASSWORD = 'ilovebae';

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('authorized');
    if (stored === 'true') setAuthorized(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem('authorized', 'true');
      setAuthorized(true);
    } else {
      alert('Wrong password!');
    }
  };

  const hearts = useMemo(() => {
    if (!isClient) return [];
    return [...Array(10)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      fontSize: `${16 + Math.random() * 24}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
    }));
  }, [isClient]);

  const renderFloatingHearts = () =>
    hearts.map((heart) => (
      <div
        key={heart.id}
        className="absolute text-pink-400 text-2xl animate-floating"
        style={{
          left: heart.left,
          top: '100%',
          fontSize: heart.fontSize,
          animationDelay: heart.delay,
          animationDuration: heart.duration,
        }}
      >
        ❤️
      </div>
    ));
  

  if (!authorized) {
    
    
    return (
      <div className="relative flex flex-col items-center justify-center h-screen bg-pink-100 overflow-hidden text-center">
      {renderFloatingHearts()}


  {/* Password form container */}
<div className="z-10 bg-white/90 p-6 rounded-4xl shadow-xl backdrop-blur-xl">
  <h2 className="text-2xl font-semibold mb-4 text-gray-700">Enter Password</h2>
  <form onSubmit={handleSubmit} className="space-x-2">
    <input
      type="password"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Password"
      className="text-gray-700 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
    />
    <button
      type="submit"
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
    >
      →
    </button>
  </form>
</div>

</div>

    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-pink-100 overflow-hidden">
      <h1 className="text-3xl font-bold mb-2 text-gray-700">Annabel's Birthday ❤️</h1>
      <p className="text-lg text-gray-700">Choose what you would like to do</p>

      <Link href="/letter">
        <button className="mt-5 px-6 py-3 w-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg shadow-md transition">
          💌 Read Me
        </button>
        
      </Link>

      <Link href="/fireworks">
        <button className="mt-3 px-6 py-3 w-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg shadow-md transition">
          🎆 Fireworks
        </button>
        
      </Link>

      <Link href="/timeline">
        <button className="mt-3 px-6 py-3 w-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg shadow-md transition">
          📅 Timeline
        </button>
        
      </Link>

      <Link href="/lovemeter">
        <button className="mt-3 px-6 py-3 w-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg shadow-md transition">
          💙 Lovemeter
        </button>
        
      </Link>

      <Link href="/wheel">
        <button className="mt-3 px-6 py-3 w-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg shadow-md transition">
          🎰 Slot Machine
        </button>
        
      </Link>

    </div>
  );
}
