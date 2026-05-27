import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import PlantHero from "./assets/PlantHero.mp4";
import logo from "./assets/logo.png";
import family from "./assets/family.png";
import parchmentTexture from "./assets/parchment1.jpg";

const navLinks = ["Contact Us", "Blog", "The Flow Space"];

const products = [
  {
    icon: "🛒",
    title: "Groceries",
    description: "100% organic produce, specialty goods, and wholesome pantry staples sourced from trusted farms and suppliers.",
    hueA: 120,
    hueB: 160,
  },
  {
    icon: "💊",
    title: "Supplements",
    description: "A curated selection of high-quality vitamins, herbs, and wellness supplements to support every aspect of your health.",
    hueA: 150,
    hueB: 200,
  },
  {
    icon: "🎁",
    title: "Gifts",
    description: "Thoughtfully selected natural gift sets, wellness bundles, and unique finds for the health-conscious people in your life.",
    hueA: 90,
    hueB: 140,
  },
];

function ProductCard({ product, i }: { product: typeof products[0]; i: number }) {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.9, delay: i * 0.35 }}
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 24px rgba(74,140,92,0.2)" }}
      className="relative flex flex-col items-center text-center bg-stone-900 border border-green-900/40 rounded-2xl px-8 py-10 cursor-default overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: `linear-gradient(135deg, hsl(${product.hueA}, 60%, 30%), hsl(${product.hueB}, 60%, 20%))` }}
      />
      <motion.div
        whileHover={{ scale: 1.15, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-6xl mb-6 z-10"
      >
        {product.icon}
      </motion.div>
      <h3 className="text-white text-2xl font-[Playfair_Display] tracking-wide mb-4 z-10">
        {product.title}
      </h3>
      <p className="text-stone-400 text-sm leading-relaxed z-10">
        {product.description}
      </p>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "40%" }}
        transition={{ delay: i * 0.15 + 0.4, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent"
      />
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null)!;
  const whoRef = useRef<HTMLElement>(null)!;
  const productsRef = useRef<HTMLElement>(null)!;

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);

  const { scrollYProgress: whoScroll } = useScroll({
    target: whoRef,
    offset: ["start end", "center center"],
  });

  const imgX = useTransform(whoScroll, [0, 1], ["-140px", "0px"]);
  const imgOpacity = useTransform(whoScroll, [0, 0.7], [0, 1]);
  const textX = useTransform(whoScroll, [0, 1], ["140px", "0px"]);
  const textOpacity = useTransform(whoScroll, [0, 0.7], [0, 1]);

  return (
    <div className="bg-black">

      {/* ── HERO SECTION ── */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <nav className="absolute top-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          <div>
            <img src={logo} alt="Everything Natural" className="h-28 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-white font-medium">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href="#"
                className="relative hover:text-green-300 transition-colors cursor-pointer"
                whileHover="hover"
              >
                {link}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-400 rounded-full"
                  variants={{ hover: { width: "100%" }, default: { width: "0%" } }}
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </div>
          <button
            className="md:hidden z-40 flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-[2px] bg-white rounded-full origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block w-6 h-[2px] bg-white rounded-full" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-[2px] bg-white rounded-full origin-center" />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-3xl font-[Playfair_Display] tracking-wide hover:text-green-300 transition-colors cursor-pointer"
                >
                  {link}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col gap-4 mt-4 items-center">
                <button className="px-8 py-3 bg-green-800 text-violet-50 rounded-full font-medium w-52">Who We Are</button>
                <button className="px-8 py-3 border border-violet-600/60 text-violet-100 rounded-full font-medium w-52">Our Products</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <video className="absolute top-0 left-0 w-full h-full object-cover scale-105" src={PlantHero} autoPlay muted loop playsInline />

        {/* Gradients sit under the texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 via-70% to-green-950/70" />
        <div className="absolute inset-0 bg-green-900/10 mix-blend-soft-light" />

        {/* Parchment texture — above gradients so it's visible */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url(${parchmentTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "soft-light",
            opacity: 0.5,
          }}
        />

        <motion.div style={{ top: "25%", opacity: heroOpacity, y: heroY }} className="absolute z-20 w-full text-center px-6">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-[Playfair_Display] tracking-wide pb-4">
            Mission Statement
          </h1>
          <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Our mission is to elevate the health and wellness of the Greater Scranton community by providing the highest-quality food, vitamins, and supplements in the area.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 14px rgba(134,239,172,0.45)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-44 sm:w-auto px-6 py-3 bg-green-800 text-violet-50 rounded-full cursor-pointer"
              onClick={() => scrollTo(whoRef)}
            >
              Who We Are
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(139,92,246,0.55)", backgroundColor: "rgba(109,40,217,0.25)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-44 sm:w-auto px-6 py-3 border border-violet-600/60 text-violet-100 rounded-full cursor-pointer"
              onClick={() => scrollTo(productsRef)}
            >
              Our Products
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>

      {/* ── WHO WE ARE SECTION ── */}
      <section ref={whoRef} className="relative min-h-screen bg-stone-950 flex items-center px-8 md:px-20 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-green-950/20 to-stone-950 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div style={{ x: imgX, opacity: imgOpacity }} className="rounded-2xl overflow-hidden shadow-2xl shadow-green-950/60">
            <img src={family} alt="The family of Everything Natural" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div style={{ x: textX, opacity: textOpacity }}>
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">Est. 1985</p>
            <h2 className="text-white text-4xl md:text-5xl font-[Playfair_Display] tracking-wide leading-tight mb-6">Who We Are</h2>
            <p className="text-stone-300 text-lg leading-relaxed mb-4">
              We are a family-owned and operated health food store that has been serving the Clarks Summit, PA community natural and organic food since 1985. We offer 100% organic produce, a wide range of specialty goods, and a large selection of high-quality herbs, vitamins and supplements.
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              Our commitment has never wavered — to bring you the highest quality products, and a welcoming space where your health always comes first.
            </p>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(134,239,172,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="mt-8 px-7 py-3 bg-green-800 text-amber-50 rounded-full font-medium cursor-pointer"
            >
              Our Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section ref={productsRef} className="relative bg-stone-950 px-8 md:px-20 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-green-950/10 to-stone-950 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-white text-4xl md:text-5xl font-[Playfair_Display] tracking-wide">Our Products</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.title} product={product} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(134,239,172,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="px-8 py-3 bg-green-800 hover:bg-green-700 text-green-100 rounded-full font-medium cursor-pointer"
            >
              View All Products →
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default App;