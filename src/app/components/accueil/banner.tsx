import React from 'react';
import BannerBg from '../../assets/bg.jpg';

export const Banner = () => {
  const bannerSyle: React.CSSProperties = {
    backgroundImage: `url(${BannerBg})`,
    height: 250,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <div
      className="flex items-center justify-center border-y border-b-neutral-800 border-t-neutral-800  text-white"
      style={bannerSyle}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="mb-5 text-6xl font-bold">ENEMY</span>
        <span style={{ letterSpacing: 2 }} className="text-xl text-neutral-400">
          AMATEUR GAMERS & E-SPORT ORGANIZATION
        </span>
      </div>
    </div>
  );
};
