import React from 'react';
import { Home, Image as GalleryIcon, Ticket, Compass } from 'lucide-react';
import { ScreenType } from '../types';

interface NavigationBarProps {
  currentScreen: ScreenType;
  onSwitchScreen: (screen: ScreenType) => void;
  hasActiveQuest: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentScreen,
  onSwitchScreen,
  hasActiveQuest,
}) => {
  return (
    <nav className="sticky bottom-0 z-40 bg-white border-t-2 border-[#FFE0D1] flex items-center justify-around py-2 px-2 shadow-lg max-w-[480px] mx-auto w-full">
      <button
        id="nav-home"
        type="button"
        onClick={() => onSwitchScreen('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 text-center transition-all cursor-pointer ${
          currentScreen === 'home'
            ? 'text-[#FF6B6B] font-black scale-105'
            : 'text-gray-400 hover:text-[#2D3436] font-bold'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5 stroke-[2.5]" />
        <span className="text-[10px] sm:text-[11px] leading-tight">ホーム</span>
      </button>

      {hasActiveQuest && (
        <button
          id="nav-quest"
          type="button"
          onClick={() => onSwitchScreen('quest-detail')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 text-center transition-all cursor-pointer relative ${
            currentScreen === 'quest-detail'
              ? 'text-[#FF6B6B] font-black scale-105'
              : 'text-[#4ECDC4] hover:text-[#0d9488] font-bold'
          }`}
        >
          <div className="relative">
            <Compass className="w-5 h-5 mb-0.5 stroke-[2.5] animate-pulse text-[#4ECDC4]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border-2 border-white shadow-xs"></span>
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight">挑戦中</span>
        </button>
      )}

      <button
        id="nav-gallery"
        type="button"
        onClick={() => onSwitchScreen('gallery')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 text-center transition-all cursor-pointer ${
          currentScreen === 'gallery'
            ? 'text-[#FF6B6B] font-black scale-105'
            : 'text-gray-400 hover:text-[#2D3436] font-bold'
        }`}
      >
        <GalleryIcon className="w-5 h-5 mb-0.5 stroke-[2.5]" />
        <span className="text-[10px] sm:text-[11px] leading-tight">思い出</span>
      </button>

      <button
        id="nav-coupon"
        type="button"
        onClick={() => onSwitchScreen('coupon')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 text-center transition-all cursor-pointer ${
          currentScreen === 'coupon'
            ? 'text-[#FF6B6B] font-black scale-105'
            : 'text-gray-400 hover:text-[#2D3436] font-bold'
        }`}
      >
        <Ticket className="w-5 h-5 mb-0.5 stroke-[2.5]" />
        <span className="text-[10px] sm:text-[11px] leading-tight">クーポン</span>
      </button>
    </nav>
  );
};
