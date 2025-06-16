import React from 'react';

interface Feature {
  icon: string;
  text: string;
}

const features: Feature[] = [
  { icon: '/why choose us/I1.png', text: '100% Pure Ingrediants' },
  { icon: '/why choose us/l2new.png', text: 'No Preservative' },
  { icon: '/why choose us/I3new.png', text: 'Hygienic Packaging' },
  { icon: '/why choose us/l4new.png', text: 'Traditional Blend' },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="px-4 md:px-8 md:mt-10 text-center relative font-heading">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        Why <span className="text-yellow-400">Choose Us</span>
      </h2>

      {/* 🖥️ Desktop Layout */}
      <div className="hidden md:flex max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-6 md:p-5 items-center justify-between gap-4 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-transparent">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white w-full md:w-1/4 font-body"
          >
            <img
              src={feature.icon}
              className="h-20 w-20 object-contain mb-3 transition-transform duration-300 hover:scale-110"
              alt={feature.text}
            />
            <p className="text-sm md:text-base font-medium">{feature.text}</p>
          </div>
        ))}
      </div>

      {/* 📱 Mobile Layout */}
      <div className="md:hidden grid grid-cols-2 gap-4 max-w-md mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white/10 border border-white/20 rounded-2xl text-white backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform duration-300 active:scale-105 hover:shadow-yellow-300/30"
          >
            <img
              src={feature.icon}
              className="h-16 w-16 object-contain mb-2"
              alt={feature.text}
            />
            <p className="text-xs font-medium">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
