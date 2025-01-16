import React from 'react';

const FeatureCard = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-md overflow-hidden bg-zinc-900 rounded-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-zinc-900">
        <h2 className="text-xl font-bold mb-3 text-white tracking-wide">
          {title}
        </h2>
        <p className="text-zinc-300 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

// Example usage component
const Gamecard = () => {
  return (
    <div className="flex gap-6 p-8 bg-black">
      <FeatureCard
        title="BUILT IN UNREAL ENGINE 5"
        imageUrl="../images/hoodie.jpg"
        description="Bellum harnesses the power of Unreal Engine 5, utilizing Lumen and Nanite technology to create stunning and immersive environments. Explore new expansive terrains set in Africa with maps designed to empower deliberate tactical decisions."
      />
    </div>
  );
};

export default Gamecard;