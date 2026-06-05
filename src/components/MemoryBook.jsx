import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';

const allPhotos = [
  "/WhatsApp Image 2026-06-01 at 21.31.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.31.46.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.03.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.55.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.36.15.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.37.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.01.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.17.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.39.05.jpeg", 
  "/WhatsApp Image 2026-06-01 at 21.39.33.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.41.00.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.43.10.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (1).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (2).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (3).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.12.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.49.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.50.jpeg"
];

const pages = [
  {
    photos: allPhotos.slice(0, 4),
    text: "Sejak pertama kali kita bertemu, aku langsung terpesona melihat senyum dan matamu yang indah. Saat itu, aku langsung tahu bahwa aku harus mengenalmu lebih jauh."
  },
  {
    photos: allPhotos.slice(4, 8),
    text: "Kadang aku mikir, kenapa orang kayaaa kamu mauu sama orang kayaa akuuu. kalau diliat-liat dari aku yang dulu WKWKW"
  },
  {
    photos: allPhotos.slice(8, 12),
    text: "Tapi untungnya kamu mau sihh hehe, aku sangat ingat momen fotobooth kita pertama kali yang sampai sekarang fotonya masih aku simpan dengan aman di lemari."
  },
  {
    photos: allPhotos.slice(12, 16),
    text: "Aku suka banget saat kamu ngirim pap mirror yang sangat lucu ini, aku juga suka banget sama matanyaa, gemes bangettt"
  },
  {
    photos: allPhotos.slice(16, 20),
    text: "Aku lumayan sedih saat kamu ke eropa karna kita jadi susah untuk komunikasi walaupun kamu selalu memberikan kabar melalui pap dengan jarak waktu yang sangat lama itu😔, untung banget kamuu sangatt cantikk disanaa jadi aku luluh hehe🫠 "
  },
  {
    photos: allPhotos.slice(20, 24),
    text: "Kamu gemashh banget saat main di salju🥹 dan semoga kamu suka sama kado kecil sederhana dari aku yaaa, love youu bebeee 🩶"
  }
];

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-[#FDFBF7] shadow-inner overflow-hidden border-l border-[#D4AF37]/30 relative" ref={ref}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {props.children}
      </div>
    </div>
  );
});

const Cover = React.forwardRef((props, ref) => {
  return (
    <div className="bg-[#4A0A28] shadow-2xl border border-[#D4AF37]/60 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 to-black/60"></div>
      <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center">
        <div className="border border-[#D4AF37]/40 w-full h-full flex flex-col items-center justify-center p-2 text-center bg-black/10">
          <h1 className="text-3xl md:text-5xl font-serif text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-tight">Our <br/> Memories</h1>
          <div className="w-12 h-px bg-[#D4AF37] my-6"></div>
          <h2 className="text-lg md:text-2xl font-serif text-[#F9D7E3] italic tracking-widest">{props.title || "Volume I"}</h2>
          {props.children}
        </div>
      </div>
    </div>
  );
});

const MemoryBook = ({ onComplete }) => {
  const bookRef = useRef();
  const audioRef = useRef(null);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('/page-flip.mp3');
  }, []);

  const onFlip = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(()=>console.log("Audio play blocked"));
    }
  };

  const rotations = [-2, 3, -1, 2];

  const handleWrapperClick = (e) => {
    if (isPortrait && bookRef.current) {
      // Don't intercept button clicks
      if (e.target.closest('button')) return;
      
      // Calculate physical Y coordinate
      if (e.clientY < window.innerHeight / 2) {
        bookRef.current.pageFlip().flipNext();
      } else {
        bookRef.current.pageFlip().flipPrev();
      }
    }
  };

  return (
    <div 
      className="w-full h-full flex justify-center items-center py-6 md:py-10 perspective-[1500px]"
      onClick={handleWrapperClick}
    >
      <HTMLFlipBook 
        key={isPortrait ? 'portrait' : 'landscape'}
        width={420} 
        height={580} 
        size="stretch"
        minWidth={300}
        maxWidth={550}
        minHeight={400}
        maxHeight={800}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={!isPortrait}
        useMouseEvents={!isPortrait}
        usePortrait={false}
        flippingTime={isPortrait ? 2500 : 1000}
        className="demo-book drop-shadow-[0_25px_35px_rgba(107,15,58,0.3)]"
        ref={bookRef}
        onFlip={onFlip}
      >
        <Cover title="For Nayla" />

        {pages.flatMap((page, idx) => [
          /* LEFT PAGE: PHOTOS */
          <Page key={`photo-${idx}`}>
            <div className="flex-1 flex flex-col justify-center items-center h-full w-full py-4">
              <div className="grid grid-cols-2 gap-2 md:gap-4 w-full px-2 pb-6">
                {page.photos.map((photo, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-1.5 pb-5 md:p-2 md:pb-7 shadow-md border border-gray-100 flex flex-col items-center w-full"
                    style={{ transform: `rotate(${rotations[i]}deg)` }}
                  >
                    <img src={photo} alt="Memory" className="w-full aspect-[4/5] object-cover object-center bg-gray-100 rounded-sm pointer-events-none" draggable={false} loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-6 text-xs font-serif text-[#D4AF37]/50">
                {idx * 2 + 1}
              </div>
            </div>
          </Page>,
          
          /* RIGHT PAGE: TEXT */
          <Page key={`text-${idx}`}>
            <div className="flex-1 flex flex-col justify-center items-center h-full px-8 md:px-12 text-center">
              <p className="font-serif text-lg md:text-2xl italic text-[#4A0A28] leading-relaxed font-medium">
                "{page.text}"
              </p>
              <div className="absolute bottom-4 right-6 text-xs font-serif text-[#D4AF37]/50">
                {idx * 2 + 2}
              </div>
            </div>
          </Page>
        ])}

        <Cover title="The End">
           <button 
             onClick={(e) => { e.stopPropagation(); onComplete(); }}
             className="mt-8 px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-serif hover:bg-[#D4AF37] hover:text-[#4A0A28] transition-colors uppercase tracking-widest text-sm z-50 cursor-pointer"
           >
             Selanjutnya...
           </button>
        </Cover>

      </HTMLFlipBook>
    </div>
  );
};

export default MemoryBook;
