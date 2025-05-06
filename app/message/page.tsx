'use client';

import { useState } from 'react';

const webhooks = {
    fromBae: 'https://discord.com/api/webhooks/1369404265428291585/8uTWDEONfh7TNESPKYcyQ7KOWe10F1_sC06cTkMmIK2kn4wAFqNuT8i-uTQMzWgpQW67',
    fromMe: 'https://discord.com/api/webhooks/1369406078198091798/AojvUvRdRQrJVsT1muviscX94b1w1CG9luRcsDqkTV7v0t1-rL69np4ZInmEVkANg-mh'
}

export default function BaeButtons() {
    const [status, setStatus] = useState('');
    const [showStatus, setShowStatus] = useState(false);

    const [sender, setSender] = useState<'fromBae' | 'fromMe'>('fromBae');
  
    const sendMessage = async (content: string) => {
      const webhookUrl = webhooks[sender];
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [
              {
                title: content,
                color: sender === 'fromBae' ? 0xF472B6 : 0x42a1f5, // Tailwind's pink-400 (optional)
              },
            ],
          }),
        });
        setStatus('Message Sent!');
      } catch (err) {
        setStatus('Failed to send 💔');
      }

      setShowStatus(true);
      setTimeout(() => {
        setStatus('');
        setShowStatus(false);
      }, 2000);
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-4">
        

        <h1 className="text-3xl font-bold text-pink-600 mb-6">Send a Message 💖</h1>
  
       {/* Sender Switch */}
        <div className="mb-6 flex items-center gap-2">
        <label className="text-sm font-semibold text-pink-600">Sender:</label>
        <div className="relative w-[90px] h-10 bg-white border border-pink-300 rounded-full shadow flex items-center">
            {/* Animated slider */}
            <div
            className={`absolute w-1/2 h-full bg-pink-500 rounded-full transition-transform duration-300 ${
                sender === 'fromBae' ? 'translate-x-0' : 'translate-x-full'
            }`}
            />

            <button
            onClick={() => setSender('fromBae')}
            className={`w-1/2 h-full z-10 text-sm font-semibold transition ${
                sender === 'fromBae' ? 'text-white' : 'text-pink-600'
            }`}
            >
            A
            </button>
            <button
            onClick={() => setSender('fromMe')}
            className={`w-1/2 h-full z-10 text-sm font-semibold transition ${
                sender === 'fromMe' ? 'text-white' : 'text-pink-600'
            }`}
            >
            T
            </button>
        </div>
        </div>


  
        <div className="relative w-full max-w-xs mb-10">
  {/* Buttons */}
  <div className="space-y-4">
    <button onClick={() => sendMessage('💌 I miss you!')} className="w-70 bg-white px-6 py-3 rounded-full shadow text-pink-600 font-semibold hover:bg-pink-100">
      I Miss You
    </button>
    <button onClick={() => sendMessage('🐻 Come cuddle!')} className="w-70 bg-white px-6 py-3 rounded-full shadow text-pink-600 font-semibold hover:bg-pink-100">
      Cuddle Time
    </button>
    <button onClick={() => sendMessage('🍱 Let’s eat!')} className="w-70 bg-white px-6 py-3 rounded-full shadow text-pink-600 font-semibold hover:bg-pink-100">
      Let’s Eat
    </button>
    <button onClick={() => sendMessage("🚨 SOS!")} className="w-70 bg-white px-6 py-3 rounded-full shadow text-pink-600 font-semibold hover:bg-pink-100">
      Emergency
    </button>
    <button onClick={() => sendMessage('🍆💦 I’m Horny, Let’s Fuck Already')} className="w-70 bg-white px-6 py-3 rounded-full shadow text-pink-600 font-semibold hover:bg-pink-100">
        🙈
    </button>
  </div>

  {/* Toast message positioned absolutely below the buttons */}
  {showStatus && (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 backdrop-blur-md bg-white/70 text-pink-600 px-6 py-2 rounded-full shadow-md transition-opacity duration-300"
    >
      {status}
    </div>
  )}
</div>

        
  
      </div>
    );
  }