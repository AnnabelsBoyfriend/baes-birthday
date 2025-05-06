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
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-pink-100 to-pink-200 px-4 overflow-hidden">
  <h1 className="text-3xl font-extrabold text-pink-600 drop-shadow mb-2 animate-fade-in">
    Annabel's Birthday 
  </h1>
  <p className="text-md text-gray-700 mb-8 animate-fade-in delay-200">
    Choose what you'd like to do, bae 💖
  </p>

  <div className="w-55 max-w-sm flex flex-col gap-4 animate-fade-in delay-300">
    {[
      { label: '💌 Read Me', href: '/letter' },
      { label: '📅 Timeline', href: '/timeline' },
      { label: '🎆 Fireworks', href: '/fireworks' },
      { label: '💙 Lovemeter', href: '/lovemeter' },
      { label: '🎰 Slot Machine', href: '/wheel' },
      { label: '🐤 Send Message', href: '/message' },
    ].map(({ label, href }) => (
      <Link key={label} href={href}>
        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all hover:scale-105 hover:shadow-lg">
          {label}
        </button>
      </Link>
    ))}
  </div>
</div>

  );
}
