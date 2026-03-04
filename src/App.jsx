import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaFlagCheckered, FaClock } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

// --- Components ---

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-03-07T14:00:00") - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 mt-8 font-mono text-primary-green">
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center bg-black/40 p-2 rounded-lg border border-primary-green/20 backdrop-blur-sm">
            <span className="text-2xl md:text-5xl font-black leading-none">{value.toString().padStart(2, '0')}</span>
            <span className="text-[10px] md:text-xs uppercase opacity-60 tracking-tighter mt-1">{label}</span>
          </div>
        ))
      ) : (
        <span className="col-span-4 text-2xl font-black uppercase italic animate-bounce text-primary-green">Start Your Engines!</span>
      )}
    </div>
  );
};

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const carX = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  const lat = -1.2307;
  const lng = 36.8122;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005}%2C${lat-0.005}%2C${lng+0.005}%2C${lat+0.005}&layer=mapnik&marker=${lat}%2C${lng}`;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-dark-bg text-light-text font-sans overflow-x-hidden selection:bg-primary-green selection:text-dark-bg">
      
      {/* Racing Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 md:h-2 bg-black/50 z-50">
        <motion.div className="h-full bg-primary-green shadow-[0_0_15px_#39FF14]" style={{ scaleX }} />
        <motion.div 
          style={{ left: carX }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 hidden md:block"
        >
          <FaFlagCheckered className="text-primary-green text-xl" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-green/10 via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10"
        >
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center space-x-2 mb-6 text-primary-green"
          >
            <FaFlagCheckered />
            <span className="uppercase tracking-[0.3em] md:tracking-[0.6em] text-[10px] md:text-sm font-black">Official Race Entry</span>
            <FaFlagCheckered />
          </motion.div>

          <h1 className="text-[18vw] md:text-[12rem] font-black text-primary-green italic tracking-tighter uppercase leading-[0.8] drop-shadow-[0_10px_30px_rgba(57,255,20,0.5)]">
            Christian
          </h1>
          <h2 className="text-4xl md:text-8xl font-black mt-4 uppercase italic text-white flex flex-wrap justify-center gap-x-4">
            Turns <span className="text-primary-green border-b-8 border-primary-green leading-none">8</span>
          </h2>
        </motion.div>

        {/* 🚗 DRIFTING CAR */}
        <motion.div 
          initial={{ x: '100vw', y: 0 }}
          animate={{ x: '-100vw', y: [0, -5, 0] }}
          transition={{ 
            x: { duration: 6, repeat: Infinity, repeatDelay: 5, ease: "linear" },
            y: { duration: 0.2, repeat: Infinity, ease: "easeInOut" } // Vibrating effect
          }}
          className="absolute bottom-32 md:bottom-20 z-20 pointer-events-none"
        >
          <img 
            src="/racecar.png" 
            alt="Racing Car" 
            className="w-56 md:w-[36rem] drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
          />
        </motion.div>

        <Countdown />

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 text-primary-green opacity-40 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest mb-2 text-center">Scroll to Start</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary-green to-transparent" />
        </motion.div>

        {/* Speed Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 md:opacity-40">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '100vw' }}
              animate={{ x: '-100vw' }}
              transition={{ duration: 0.2 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
              className="h-[1px] bg-primary-green absolute w-32 md:w-64"
              style={{ top: `${5 + i * 8}%`, left: 0 }}
            />
          ))}
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 md:py-40 px-6 bg-dark-bg relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-4xl md:text-7xl font-black text-primary-green uppercase italic tracking-tighter mb-8">
              The Starting Grid
            </h3>
            <p className="text-lg md:text-3xl leading-relaxed text-light-text/90 font-medium max-w-3xl mx-auto">
              Christian is hitting the fast lane as he turns 8! Get ready for a high-octane celebration at the <span className="text-primary-green">Village Market</span>. 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 border-2 border-primary-green/20 rounded-[2rem] md:rounded-[3rem] bg-black/40 backdrop-blur-xl relative"
            >
              <div className="flex items-center space-x-4 text-primary-green mb-6">
                <FaMapMarkerAlt size={32} />
                <h4 className="text-3xl font-black uppercase italic tracking-tighter">The Track</h4>
              </div>
              <p className="text-2xl font-bold text-white mb-2">Village Market</p>
              <p className="text-lg opacity-60 italic mb-6">Limuru Road, Nairobi, Kenya</p>
              <div className="flex items-center space-x-3 text-primary-green font-black text-2xl uppercase italic">
                <FaClock size={20} />
                <span>Start: 2:00 PM</span>
              </div>
            </motion.div>

            {/* RSVP Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 border-2 border-primary-green/20 rounded-[2rem] md:rounded-[3rem] bg-black/40 backdrop-blur-xl relative"
            >
              <div className="flex items-center space-x-4 text-primary-green mb-6">
                <FaPhoneAlt size={28} />
                <h4 className="text-3xl font-black uppercase italic tracking-tighter">Crew Chief</h4>
              </div>
              <p className="text-2xl font-bold text-white mb-2">RSVP to Mercy</p>
              <p className="text-lg opacity-60 italic mb-8">Confirm your pit stop on the official guest list!</p>
              
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(57,255,20,0.6)" }}
                whileTap={{ scale: 0.95, x: [0, -2, 2, -2, 2, 0] }}
                href="tel:+254721468843"
                className="inline-flex items-center justify-center w-full md:w-auto bg-primary-green text-dark-bg font-black py-5 px-10 rounded-2xl uppercase tracking-tighter italic text-xl shadow-[0_10px_20px_rgba(57,255,20,0.3)]"
              >
                <FaPhoneAlt className="mr-3" />
                Rev to Call
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-black relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2rem] md:rounded-[4rem] overflow-hidden border-4 border-primary-green/40"
          >
            <div className="map-container grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                className="responsive-iframe"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapSrc}
              ></iframe>
            </div>
          </motion.div>
          <h5 className="text-primary-green font-black text-3xl md:text-5xl uppercase italic tracking-[0.2em] text-center mt-12">
            Nairobi, Kenya
          </h5>
        </div>
      </section>

      {/* RE-VAMPED CLEAN FOOTER */}
      <footer className="py-20 text-center border-t border-primary-green/10 bg-dark-bg">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-primary-green font-black text-2xl md:text-5xl uppercase italic tracking-widest mb-4">
            Ready. Set. Celebrate!
          </p>
        </motion.div>
        
        <div className="flex justify-center space-x-6 mt-8 mb-12">
          <FaFlagCheckered className="text-primary-green/20" size={24} />
          <div className="h-px w-20 bg-primary-green/10 self-center" />
          <FaFlagCheckered className="text-primary-green/20" size={24} />
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-primary-green/40 hover:text-primary-green transition-colors uppercase text-[10px] font-black tracking-[0.5em]"
        >
          Back to Start
        </button>
        
        <p className="text-light-text/10 text-[10px] uppercase tracking-[0.5em] mt-12">
          © 2026 Birthday Invitations
        </p>
      </footer>
    </div>
  );
};

export default App;
