import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, Clock, X, MessageCircle } from 'lucide-react';
import { MemoryPost, QuestMinutes } from '../types';

interface GalleryScreenProps {
  memories: MemoryPost[];
  onToggleLike: (postId: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  memories,
  onToggleLike,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<number | 'all'>('all');
  const [activeModalPost, setActiveModalPost] = useState<MemoryPost | null>(null);

  const filteredMemories = memories.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.minutes === selectedFilter;
  });

  return (
    <div id="gallery-screen" className="space-y-4 animate-in fade-in duration-200">
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#2D3436] leading-tight">
            みんなの思い出
          </h2>
          <p className="text-xs font-bold text-gray-500">
            日南線ロスタイムで生まれた素敵な瞬間のギャラリー
          </p>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FFE066] text-[#6B4E16] border-2 border-[#FFCC00] shadow-xs">
          {memories.length} 件の投稿
        </span>
      </div>

      {/* Filter Chips in Vibrant Palette */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-full font-black transition-all cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-[#FF6B6B] text-white shadow-xs'
              : 'bg-[#FFF9F2] text-[#2D3436] border-2 border-[#FFE0D1] hover:bg-[#FFE0D1]'
          }`}
        >
          すべて
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter(30)}
          className={`px-3.5 py-1.5 rounded-full font-black transition-all cursor-pointer ${
            selectedFilter === 30
              ? 'bg-[#FF6B6B] text-white shadow-xs'
              : 'bg-[#FFF9F2] text-[#2D3436] border-2 border-[#FFE0D1] hover:bg-[#FFE0D1]'
          }`}
        >
          30分コース
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter(60)}
          className={`px-3.5 py-1.5 rounded-full font-black transition-all cursor-pointer ${
            selectedFilter === 60
              ? 'bg-[#FF6B6B] text-white shadow-xs'
              : 'bg-[#FFF9F2] text-[#2D3436] border-2 border-[#FFE0D1] hover:bg-[#FFE0D1]'
          }`}
        >
          1時間コース
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter(120)}
          className={`px-3.5 py-1.5 rounded-full font-black transition-all cursor-pointer ${
            selectedFilter === 120
              ? 'bg-[#FF6B6B] text-white shadow-xs'
              : 'bg-[#FFF9F2] text-[#2D3436] border-2 border-[#FFE0D1] hover:bg-[#FFE0D1]'
          }`}
        >
          2時間以上
        </button>
      </div>

      {/* Gallery Grid */}
      <div
        id="gallery-list"
        className="grid grid-cols-2 gap-3"
      >
        {filteredMemories.map((item) => (
          <div
            key={item.id}
            className="gallery-item border-2 border-[#FFE0D1] rounded-3xl overflow-hidden bg-white shadow-xs hover:border-[#4ECDC4] transition-all flex flex-col group cursor-pointer"
            onClick={() => setActiveModalPost(item)}
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
              <img
                src={item.imageSrc}
                alt={item.questTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Station badge overlay */}
              {item.station && (
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <MapPin className="w-2.5 h-2.5 text-[#4ECDC4]" />
                  {item.station}
                </span>
              )}
              {/* Points badge */}
              <span className="absolute bottom-2 right-2 bg-[#FF6B6B] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                +{item.pts}pt
              </span>
            </div>

            {/* Info */}
            <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <p className="text-xs font-black text-[#2D3436] line-clamp-1 leading-snug">
                  {item.questTitle}
                </p>
                {item.caption && (
                  <p className="text-[11px] text-gray-500 font-bold line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#FFE0D1] text-[10px] text-gray-500 font-bold">
                <span className="truncate max-w-[70px]">{item.author}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(item.id);
                  }}
                  className={`flex items-center gap-1 font-black transition-colors ${
                    item.isLikedByMe ? 'text-[#FF6B6B]' : 'text-gray-400 hover:text-[#FF6B6B]'
                  }`}
                  title="いいね"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${item.isLikedByMe ? 'fill-[#FF6B6B]' : ''}`}
                  />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMemories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-[#FFE0D1] p-6 space-y-2">
          <p className="text-sm font-black text-[#2D3436]">まだ投稿がありません</p>
          <p className="text-xs font-bold text-gray-400">
            最初のクエストをクリアして、素敵な写真を投稿してみましょう！
          </p>
        </div>
      )}

      {/* Memory Detail Modal */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFF9F2] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border-4 border-[#FFE0D1]">
            <button
              onClick={() => setActiveModalPost(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-4/3 bg-black">
              <img
                src={activeModalPost.imageSrc}
                alt={activeModalPost.questTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeModalPost.station} • {activeModalPost.createdAt}
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0d9488] bg-[#4ECDC4]/20 px-2.5 py-0.5 rounded-full">
                    クリアクエスト
                  </span>
                  <span className="text-sm font-black text-[#FF6B6B]">
                    +{activeModalPost.pts} pt 獲得
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#2D3436] mt-1">
                  {activeModalPost.questTitle}
                </h3>
              </div>

              {activeModalPost.caption && (
                <div className="bg-white rounded-2xl p-3 text-xs text-gray-700 font-bold leading-relaxed border-2 border-[#FFE0D1]">
                  <p className="italic">“{activeModalPost.caption}”</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#FFE0D1] text-xs text-gray-600">
                <span className="font-bold">
                  投稿者: {activeModalPost.author}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleLike(activeModalPost.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs transition-colors ${
                    activeModalPost.isLikedByMe
                      ? 'bg-[#FFE0D1] text-[#FF6B6B]'
                      : 'bg-white border-2 border-[#FFE0D1] text-gray-700 hover:text-[#FF6B6B]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      activeModalPost.isLikedByMe ? 'fill-[#FF6B6B]' : ''
                    }`}
                  />
                  <span>{activeModalPost.likes} いいね</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
