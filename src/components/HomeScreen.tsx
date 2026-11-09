import React, { useState } from 'react';
import { Clock, Sparkles, RefreshCw, ChevronRight, Compass, ShieldAlert, Play, CheckCircle2 } from 'lucide-react';
import { Quest, QuestMinutes } from '../types';
import { QUESTS } from '../data/quests';

interface HomeScreenProps {
  onStartQuest: (quest: Quest) => void;
  activeQuest: Quest | null;
  onResumeActiveQuest: () => void;
  selectedStation: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartQuest,
  activeQuest,
  onResumeActiveQuest,
  selectedStation,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<QuestMinutes | null>(30);
  const [recommendedQuest, setRecommendedQuest] = useState<Quest | null>(() => {
    const list = QUESTS[30];
    return list[Math.floor(Math.random() * list.length)];
  });

  const handleSelectMinutes = (minutes: QuestMinutes) => {
    setSelectedMinutes(minutes);
    const list = QUESTS[minutes];
    const randomIndex = Math.floor(Math.random() * list.length);
    setRecommendedQuest(list[randomIndex]);
  };

  const handleShuffle = () => {
    if (!selectedMinutes) return;
    const list = QUESTS[selectedMinutes];
    if (list.length <= 1) return;
    let nextQuest = list[Math.floor(Math.random() * list.length)];
    // Ensure different quest if possible
    if (recommendedQuest && list.length > 1) {
      let attempts = 0;
      while (nextQuest.id === recommendedQuest.id && attempts < 10) {
        nextQuest = list[Math.floor(Math.random() * list.length)];
        attempts++;
      }
    }
    setRecommendedQuest(nextQuest);
  };

  return (
    <div id="home-screen" className="space-y-5 animate-in fade-in duration-200">
      {/* Ongoing active quest notice if exists */}
      {activeQuest && (
        <div className="bg-[#FFF4E5] border-2 border-[#FFD3A3] text-[#2D3436] rounded-3xl p-4.5 shadow-sm flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-black bg-[#FF6B6B] text-white px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider">
              進行中のクエスト
            </span>
            <h3 className="font-black text-sm sm:text-base text-[#2D3436] line-clamp-1">
              {activeQuest.title}
            </h3>
            <p className="text-xs font-bold text-[#A0522D]">
              クリアで <span className="text-[#FF6B6B] font-black">+{activeQuest.pts}pt</span> ゲット！
            </p>
          </div>
          <button
            onClick={onResumeActiveQuest}
            className="shrink-0 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-md flex items-center gap-1 transition-transform active:scale-95 border-b-2 border-[#D94F4F]"
          >
            <span>再開</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main question section */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#FFE0D1] shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-[#FFE0D1] text-[#FF6B6B] flex items-center justify-center font-black shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#2D3436] leading-tight">
              電車の待ち時間は？
            </h2>
            <p className="text-xs font-bold text-gray-500 mt-0.5">
              待ち時間の長さに合わせてピッタリなクエストを提案します！
            </p>
          </div>
        </div>

        {/* Time selection buttons with tactile Vibrant Palette styling */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            id="time-btn-30"
            type="button"
            onClick={() => handleSelectMinutes(30)}
            className={`py-3 px-2 rounded-2xl font-black text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
              selectedMinutes === 30
                ? 'btn-vibrant-mint text-white shadow-sm'
                : 'bg-[#FFF9F2] hover:bg-[#F0FDFD] text-[#2D3436] border-2 border-[#FFE0D1] border-b-4 border-[#FFE0D1]'
            }`}
          >
            <span className="text-base font-black">30 分</span>
            <span className={`text-[10px] font-bold ${selectedMinutes === 30 ? 'text-teal-100' : 'text-gray-400'}`}>
              サクッと体験
            </span>
          </button>

          <button
            id="time-btn-60"
            type="button"
            onClick={() => handleSelectMinutes(60)}
            className={`py-3 px-2 rounded-2xl font-black text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
              selectedMinutes === 60
                ? 'btn-vibrant-mint text-white shadow-sm'
                : 'bg-[#FFF9F2] hover:bg-[#F0FDFD] text-[#2D3436] border-2 border-[#FFE0D1] border-b-4 border-[#FFE0D1]'
            }`}
          >
            <span className="text-base font-black">1 時間</span>
            <span className={`text-[10px] font-bold ${selectedMinutes === 60 ? 'text-teal-100' : 'text-gray-400'}`}>
              街歩き・カフェ
            </span>
          </button>

          <button
            id="time-btn-120"
            type="button"
            onClick={() => handleSelectMinutes(120)}
            className={`py-3 px-2 rounded-2xl font-black text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
              selectedMinutes === 120
                ? 'btn-vibrant-mint text-white shadow-sm'
                : 'bg-[#FFF9F2] hover:bg-[#F0FDFD] text-[#2D3436] border-2 border-[#FFE0D1] border-b-4 border-[#FFE0D1]'
            }`}
          >
            <span className="text-base font-black">2 時間以上</span>
            <span className={`text-[10px] font-bold ${selectedMinutes === 120 ? 'text-teal-100' : 'text-gray-400'}`}>
              じっくり探検
            </span>
          </button>
        </div>
      </div>

      {/* Quest area - Styled like the Active Mission in Vibrant Palette */}
      <div id="quest-area">
        {recommendedQuest ? (
          <div className="bg-[#FFFAEC] border-4 border-dashed border-[#FF6B6B] rounded-[32px] p-5 sm:p-6 relative shadow-sm overflow-hidden">
            {/* Top badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1 rounded-full bg-[#FF6B6B] text-white uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                RECOMMENDED QUEST ({recommendedQuest.minutes}分)
              </span>

              <button
                type="button"
                onClick={handleShuffle}
                className="text-xs font-black text-[#FF6B6B] hover:text-[#E25555] bg-white/90 hover:bg-white flex items-center gap-1.5 py-1 px-3 rounded-full border-2 border-[#FFE0D1] shadow-xs transition-all active:scale-95"
                title="他のクエストを提案"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>チェンジ</span>
              </button>
            </div>

            {/* Quest Content */}
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-black text-[#2D3436] leading-snug">
                {recommendedQuest.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {recommendedQuest.desc}
              </p>

              {/* Station context hint */}
              <div className="bg-white/90 rounded-2xl p-3 border-2 border-[#FFE0D1] text-xs space-y-1 text-gray-700">
                <div className="flex items-center gap-1.5 text-[#0d9488] font-black text-[11px]">
                  <Compass className="w-4 h-4 text-[#4ECDC4]" />
                  <span>おすすめスポット目安 ({selectedStation}付近):</span>
                </div>
                <p className="text-xs text-gray-600 pl-5 font-bold">
                  {recommendedQuest.locationHint}
                </p>
              </div>

              {/* Points banner */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-gray-500 font-black uppercase">REWARD:</span>
                  <span className="text-2xl font-black text-[#FF6B6B]">+{recommendedQuest.pts}</span>
                  <span className="text-xs font-black text-gray-500 uppercase">POINTS</span>
                </div>

                <span className="text-xs font-black text-[#4ECDC4] bg-white px-2.5 py-0.5 rounded-full border border-[#4ECDC4]/40">
                  {recommendedQuest.categoryLabel}
                </span>
              </div>
            </div>

            {/* Action button - Tactile coral button */}
            <button
              id="start-quest-btn"
              type="button"
              onClick={() => onStartQuest(recommendedQuest)}
              className="w-full mt-4 py-3.5 px-5 rounded-full text-white font-black text-base btn-vibrant-coral shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all tracking-wide"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>このクエストに挑戦する！</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 font-bold text-xs">
            待ち時間を選択してください
          </div>
        )}
      </div>

      {/* Safety & Local notice in Vibrant Palette soft style */}
      <div className="bg-[#F0FDFD] border-2 border-[#FFE0D1] rounded-2xl p-3.5 flex items-start gap-3 text-xs text-[#2D3436]">
        <div className="w-7 h-7 rounded-xl bg-[#FFE0D1] text-[#FF6B6B] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <p className="font-black text-xs text-[#2D3436]">日南線ロスタイムのお約束</p>
          <p className="text-xs text-gray-600 font-medium leading-normal">
            列車は発車の5分前にはホームへ！無理のない範囲で安全に日南のロスタイムを楽しんでくださいね。
          </p>
        </div>
      </div>
    </div>
  );
};
