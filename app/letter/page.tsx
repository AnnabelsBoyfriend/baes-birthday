'use client';

import Link from 'next/link';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });

export default function LetterPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(circle,_rgba(255,192,203,0.2)_0%,_transparent_70%)]" />
      
      <div className="z-10 bg-white/80 backdrop-blur-md shadow-xl p-8 rounded-3xl max-w-2xl space-y-6">
        <h1 className={`text-4xl font-bold text-pink-600 ${pacifico.className}`}>Hi My Love 💌</h1>

        <p className="text-med text-gray-800">
          Happy Birthday! You made it to your 21st year on this planet. I hope you have a great year — with yourself, boss, your family, and me. 
          I hope we can do more things this year that we enjoy doing together. <br /> <br />
          I made this little site to celebrate us — the memories we've made, and the fun little things we do together.
          I have had the most fun time with you so far and I'm looking forward to a lot lot lot more with you.
        </p>

        <p className="text-med text-gray-800">
          Take your time with it — some pages are cute, some are silly, and some... a little spicy 😳. Either way, they're all for you.
        </p>

        <div className="text-left text-gray-700 mt-6">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Things to Explore:</h2>
          <ul className="text-base list-disc list-inside space-y-2">
            <li><strong>🎆 Fireworks:</strong> Launch some virtual fireworks just for fun</li>
            <li><strong>📅 Timeline:</strong> See the moments we've shared each month</li>
            <li><strong>💙 Lovemeter:</strong> Slide to see how much we love each other</li>
            <li><strong>🎰 Slot Machine:</strong> Spin to win cute or spicy rewards</li>
          </ul>
        </div>

        <p className="text-md text-gray-600 mt-6 italic">
          Just so you know, since you been on my ass asking me why I'm not texting you back and stuff recently, this is why... Oh, and I might be broke, 
          but I never run out of love to give to you. 
          <br />
          I love you very much ❤️. 
          <br />
          <br />
          P.S. Check out the slot machine later, I made a fun game for us to try...
          <br />
          <br />
          Whenever you're ready, pick what you'd like to do from the homepage 💖
        </p>

        <Link href="/" className="inline-block mt-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-md font-semibold shadow transition">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
