import React, { useState } from 'react';
import { Train, Sparkles, MapPin, Info, X } from 'lucide-react';
import { NICHINAN_STATIONS } from '../data/quests';

interface HeaderProps {
  points: number;
  selectedStation: string;
  onSelectStation: (stationName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  points,
  selectedStation,
  onSelectStation,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Level & Title calculation
  const getRankInfo = (pts: number) => {
    if (pts >= 500) return { title: '日南レジェンド', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (pts >= 300) return { title: '油津マスター', color: 'bg-purple-100 text-purple-800 border-purple-300' };
    if (pts >= 150) return { title: '飫肥探検家', color: 'bg-teal-100 text-teal-800 border-teal-300' };
    if (pts >= 50) return { title: '待ち時間ルーキー', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    return { title: '見習い冒険者', color: 'bg-amber-100 text-amber-900 border-amber-300' };
  };

  const rank = getRankInfo(points);

  return (
    <>
      <header className="bg-[#FF6B6B] text-white px-4 py-3.5 shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-2 rounded-xl transform -rotate-3 shadow-md flex items-center justify-center">
              <Train className="w-5 h-5 text-[#FF6B6B]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                日南ロスタイム・クエスト
              </h1>
              <p className="text-[11px] text-white/95 font-bold mt-1 flex items-center gap-1">
                <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">JR日南線</span>
                <span>•</span>
                <span>電車の待ち時間を冒険に！</span>
              </p>
            </div>
          </div>

          <button
            id="app-info-btn"
            onClick={() => setShowInfoModal(true)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-all shadow-xs"
            title="アプリについて"
            aria-label="アプリについて"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Station Selector Bar */}
        <div className="mt-2.5 flex items-center justify-between text-xs bg-black/15 rounded-xl px-3 py-1.5 backdrop-blur-xs border border-white/20">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <MapPin className="w-3.5 h-3.5 text-[#FFE066]" />
            <span>現在地:</span>
            <select
              id="station-selector"
              value={selectedStation}
              onChange={(e) => onSelectStation(e.target.value)}
              className="bg-white/25 text-white font-black rounded-lg px-2 py-0.5 text-xs outline-none cursor-pointer border border-white/40 focus:ring-2 focus:ring-[#FFE066] transition-all"
            >
              {NICHINAN_STATIONS.map((s) => (
                <option key={s.id} value={s.name} className="text-[#2D3436] bg-white font-bold">
                  {s.name} ({s.line})
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-white/90 font-medium hidden sm:inline">
            次の便までロスタイム冒険中
          </span>
        </div>
      </header>

      {/* Point & Status Strip - Styled like Vibrant Palette Gold Pill */}
      <div className="bg-[#FFF9F2] border-b-2 border-[#FFE0D1] px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#6B4E16] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
            <span>保有ポイント:</span>
          </span>
          <div className="flex items-baseline gap-0.5">
            <span id="point-display" className="text-2xl font-black text-[#FF6B6B] tracking-tight">
              {points}
            </span>
            <span className="text-xs font-black text-gray-500 uppercase ml-0.5">pt</span>
          </div>
        </div>

        {/* Rank Pill in Vibrant Gold Palette */}
        <div className="flex items-center gap-1.5">
          <div className="bg-[#FFE066] px-3 py-1 rounded-full border-2 border-[#FFCC00] shadow-xs flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#A0522D]">
              RANK
            </span>
            <span className="text-xs font-black text-[#6B4E16]">
              {rank.title}
            </span>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFF9F2] rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border-4 border-[#FFE0D1]">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 text-[#FF6B6B] mb-3">
              <div className="bg-white p-2 rounded-xl transform -rotate-3 shadow-xs">
                <Train className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="font-black text-lg text-[#2D3436]">日南ロスタイム・クエストとは？</h3>
            </div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
              JR日南線は運行本数が限られ、次の列車まで30分〜2時間以上待つこともあります。
              そんな「ロスタイム（待ち時間）」を日南の魅力発見クエストに変えるローカル体験アプリです！
            </p>
            <div className="bg-[#F0FDFD] border-2 border-[#4ECDC4]/50 rounded-2xl p-3.5 text-xs text-gray-700 space-y-2 mb-4">
              <div className="font-black text-[#0d9488] flex items-center gap-1.5">
                <span className="text-sm">🎯</span> あそびかたの流れ
              </div>
              <p className="font-bold">1. 待ち時間（30分 / 1時間 / 2時間以上）を選ぶ</p>
              <p className="font-bold">2. おすすめクエストに挑戦！</p>
              <p className="font-bold">3. 写真を撮ってクリア報告してポイントGET</p>
              <p className="font-bold">4. 貯まったポイントでお得な限定クーポンと交換！</p>
            </div>
            <div className="bg-[#FFF4E5] border border-[#FFD3A3] text-[11px] text-[#A0522D] rounded-xl p-2.5 font-bold mb-4">
              ⚠️ 列車の発車時刻には十分注意して、発車5分前にはホームへ戻りましょう！
            </div>
            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-3 rounded-full text-white font-black text-sm btn-vibrant-coral shadow-md"
            >
              わかった！冒険をはじめる
            </button>
          </div>
        </div>
      )}
    </>
  );
};
