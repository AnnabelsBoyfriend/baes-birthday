'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });



const timeline = [
  { month: 'November', folder: 'november', count: 9 },
  { month: 'December', folder: 'december', count: 7 },
  { month: 'January', folder: 'january', count: 10 },
  { month: 'February', folder: 'february', count: 8 },
  { month: 'March', folder: 'march', count: 5 },
  { month: 'April', folder: 'april', count: 6 },
  { month: 'May', folder: 'may', count: 4 },
];

export default function TimelinePage() {
  const [modal, setModal] = useState<{ folder: string; index: number } | null>(null);

  const openModal = (folder: string) => setModal({ folder, index: 0 });
  const closeModal = () => setModal(null);

  const captions: Record<string, string[]> = {
    november: ['Me n Bae waiting for room at Harrison', 'Bae looking cute in puffer', 'Boss taking a nap', 'I got some :)', 'Quick photo-booth with bae', 'Apple store selfies', 'I got some more :))', 'Quick SFU date', 'Kiss <3'],
    december: ['Quick date at Capilano Suspension Bridge', 'Bae putting on grinch socks', 'Birthday boy w/boss', 'Playing w the filters', 'Recroom date w bae', 'Christmas gifts <3', 'Bae trying on hats'],
    january: ['Cuddle Session', 'Ski Sunset at Cypress', 'Me and boss', 'Trying on jackets w bae', 'Uh... what u doing bae', 'Quick break from ski', 'Cypress view, but bae is the view', 'Bae tryna show off her new Arcteryx', 'Steezy fit from bae', 'Quick ski selfie'],
    february: ['Bae giving me face mask', 'Bae trying on hats again...', 'Valentines Dinner <3', 'Me looking like a pedo w bae', 'My turn to be steezy', 'Valentines flowers for the prettiest girl <3', 'Bae did not get to take him home', 'That dress looks familiar huh?'],
    march: ['Being goofy', 'Bae vs some dog', 'Baggy jeans are in this season', 'First time boss is over', 'Bae just looking cute as usual'],
    april: ['Bae looking cute on my bed', 'ChatGPT making me look good', 'Bae trying on a skirt :3', 'DTF with bae (Din Tai Fung)', 'Quick date at Fort Langley', 'Bae hitting the wrong balls (should be mine)'],
    may: ['Macaron class w Bae', 'Bae showing off her shells', '80 macarons secured', 'Certificate also secured'],
    // Add more folders & captions as needed
  };
  

  const nextImage = () => {
    if (!modal) return;
    const entry = timeline.find((t) => t.folder === modal.folder);
    if (!entry) return;
    const nextIndex = (modal.index + 1) % entry.count;
    setModal({ ...modal, index: nextIndex });
  };

  const prevImage = () => {
    if (!modal) return;
    const entry = timeline.find((t) => t.folder === modal.folder);
    if (!entry) return;
    const nextIndex = (modal.index - 1 + entry.count) % entry.count;
    setModal({ ...modal, index: nextIndex });
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-6">
      <h2 className={`text-3xl sm:text-4xl text-pink-600 text-center mb-10 ${greatVibes.className}`}>
        Hi Bae, click on a month to see some of our memories 💖
      </h2>


    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 w-1 h-full bg-pink-300 transform -translate-x-1/2" />

      <div className="flex flex-col gap-5">
        {timeline.map((entry, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={entry.month} className="relative flex flex-col sm:flex-row items-center justify-center">
              {/* Left side card */}
              {isLeft && (
                <div className="w-full sm:w-1/2 sm:pr-6 flex justify-end sm:justify-end mb-4 sm:mb-0">
                  <button
                    onClick={() => openModal(entry.folder)}
                    className="bg-white text-pink-700 font-semibold text-xl px-6 py-4 rounded-xl shadow hover:bg-pink-50 transition w-[140px] text-center"

                  >
                    {entry.month}
                  </button>
                </div>
              )}

              {/* Dot */}
              <div className="absolute sm:static left-1/2 transform -translate-x-1/2 w-5 h-5 bg-pink-500 border-4 border-white rounded-full shadow z-10" />

              {/* Right side card */}
              {!isLeft && (
                <div className="w-full sm:w-1/2 sm:pl-6 flex justify-start sm:justify-start mt-4 sm:mt-0">
                  <button
                    onClick={() => openModal(entry.folder)}
                    className="bg-white text-pink-700 font-semibold text-xl px-6 py-4 rounded-xl shadow hover:bg-pink-50 transition w-[140px] text-center"
                  >
                    {entry.month}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>


      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl h-[55vh] bg-white rounded-xl overflow-hidden shadow-xl animate-fade-in">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-3xl text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black"
            >
              ×
            </button>

            {/* Image */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="relative w-[90%] max-w-[700px] aspect-[3/4]">
                <Image
                  src={`/photos/${modal.folder}/${modal.index + 1}.jpg`}
                  alt="Memory"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-sm py-2 px-4 rounded-b-xl">
                  {captions[modal.folder]?.[modal.index] ?? ''}
                </div>
              </div>
            </div>




            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 z-40 text-3xl text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
            >
              ❮
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 z-40 text-3xl text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
