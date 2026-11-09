import React, { useState, useRef } from 'react';
import { Camera, Upload, Trash2, ArrowLeft, CheckCircle2, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quest, MemoryPost } from '../types';

interface QuestDetailScreenProps {
  quest: Quest | null;
  selectedStation: string;
  onCompleteQuest: (post: Omit<MemoryPost, 'id' | 'createdAt' | 'likes' | 'isLikedByMe'>) => void;
  onCancelQuest: () => void;
}

export const QuestDetailScreen: React.FC<QuestDetailScreenProps> = ({
  quest,
  selectedStation,
  onCompleteQuest,
  onCancelQuest,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('高校生探検隊');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!quest) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-gray-500 font-bold text-sm">現在進行中のクエストはありません</p>
        <button
          onClick={onCancelQuest}
          className="px-6 py-3 btn-vibrant-mint text-white rounded-full text-sm font-black shadow-sm"
        >
          クエストを探す
        </button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewSrc(event.target.result as string);
          setShowError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSamplePhoto = (sampleUrl: string) => {
    setPreviewSrc(sampleUrl);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (!previewSrc) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE066', '#FF9F43'],
      });
    } catch {
      // ignore
    }

    onCompleteQuest({
      questTitle: quest.title,
      imageSrc: previewSrc,
      caption: caption.trim() || `日南ロスタイムでクリア！ (${selectedStation})`,
      pts: quest.pts,
      author: authorName.trim() || '日南の探検者',
      station: selectedStation,
      minutes: quest.minutes,
    });
  };

  return (
    <div id="quest-detail-screen" className="space-y-4 animate-in fade-in duration-200">
      {/* Top back link & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancelQuest}
          className="text-xs font-black text-gray-500 hover:text-[#FF6B6B] flex items-center gap-1.5 transition-colors bg-white px-3 py-1.5 rounded-full border-2 border-[#FFE0D1] shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ホームへ戻る</span>
        </button>
        <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#FF6B6B] text-white uppercase tracking-wider shadow-xs">
          ACTIVE MISSION
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-[#FFE0D1] text-[#FF6B6B] flex items-center justify-center font-black shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#2D3436] leading-tight">
            クエストに挑戦中！
          </h2>
          <p className="text-xs font-bold text-gray-500">写真を撮影してクリア報告しよう</p>
        </div>
      </div>

      {/* Quest Detail Card */}
      <div className="bg-[#FFFAEC] border-4 border-dashed border-[#FF6B6B] p-5 rounded-[32px] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#4ECDC4] bg-white px-3 py-1 rounded-full border border-[#4ECDC4]/40">
            {quest.categoryLabel}
          </span>
          <span className="text-sm font-black text-[#FF6B6B]">
            獲得報酬: +{quest.pts} pt
          </span>
        </div>

        <h3 id="current-quest-title" className="text-lg sm:text-xl font-black text-[#2D3436] leading-snug">
          {quest.title}
        </h3>

        <p id="current-quest-desc" className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
          {quest.desc}
        </p>

        <div className="bg-white/90 rounded-2xl p-3 text-xs text-gray-700 border-2 border-[#FFE0D1] space-y-1">
          <p className="font-black text-[#0d9488] text-xs">💡 攻略のヒント:</p>
          <p className="text-xs text-gray-600 font-bold">{quest.tips}</p>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border-2 border-[#FFE0D1] space-y-3.5">
        <div>
          <label className="block text-xs font-black text-[#2D3436] mb-1">
            写真を選択してクリア報告：
          </label>
          <p className="text-[11px] font-bold text-gray-500">
            クエストを達成した様子の写真を撮影または選択してください
          </p>
        </div>

        {/* Hidden native input */}
        <input
          ref={fileInputRef}
          type="file"
          id="photo-input"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Drop/Click Box */}
        {!previewSrc ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer transition-all ${
              showError
                ? 'border-red-400 bg-red-50/60'
                : 'border-[#4ECDC4] hover:border-[#3CBFB6] bg-[#F0FDFD] hover:bg-[#e6fcfc]'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-white text-[#4ECDC4] flex items-center justify-center shadow-xs border-2 border-[#4ECDC4]">
              <Camera className="w-7 h-7" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-black text-[#2D3436]">
                タップして写真を撮影 / 選択
              </p>
              <p className="text-xs font-bold text-[#4ECDC4]">
                スマートフォンカメラまたはアルバムから
              </p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden border-3 border-[#4ECDC4] bg-gray-900 shadow-md">
            <img
              id="image-preview"
              src={previewSrc}
              alt="プレビュー"
              className="w-full max-h-[280px] object-cover block"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setPreviewSrc('');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="bg-black/70 hover:bg-black text-white p-2 rounded-xl backdrop-blur-xs transition-colors shadow-sm"
                title="写真を削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4ECDC4]" />
              <span>写真選択完了</span>
            </div>
          </div>
        )}

        {/* Quick sample photo selector for easy testing */}
        {!previewSrc && (
          <div className="pt-1">
            <p className="text-[11px] text-gray-500 font-black mb-2">
              テスト用サンプル写真で即座に試す：
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handleUseSamplePhoto(
                    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-full bg-[#FFF9F2] hover:bg-[#FFE0D1] text-[#2D3436] font-bold border-2 border-[#FFE0D1] transition-colors"
              >
                🍧 アイス写真
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUseSamplePhoto(
                    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-full bg-[#FFF9F2] hover:bg-[#FFE0D1] text-[#2D3436] font-bold border-2 border-[#FFE0D1] transition-colors"
              >
                🚃 駅舎・電車写真
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUseSamplePhoto(
                    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-full bg-[#FFF9F2] hover:bg-[#FFE0D1] text-[#2D3436] font-bold border-2 border-[#FFE0D1] transition-colors"
              >
                ☕️ カフェ写真
              </button>
            </div>
          </div>
        )}

        {/* Error warning if user didn't select photo */}
        {showError && (
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-2xl border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>クリア写真をアップロードまたは選択してください！</span>
          </div>
        )}

        {/* Optional caption */}
        <div className="space-y-1 pt-1">
          <label className="block text-xs font-black text-[#2D3436]">
            ひとことメモ・エピソード (任意)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="例: 油津駅前で友達とアイス！美味しかった！"
            className="w-full text-xs font-bold px-3.5 py-2.5 rounded-2xl border-2 border-[#FFE0D1] bg-[#FFF9F2] focus:bg-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
          />
        </div>

        {/* Nickname */}
        <div className="space-y-1">
          <label className="block text-xs font-black text-[#2D3436]">
            投稿者ニックネーム
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="高校生探検隊"
            className="w-full text-xs font-bold px-3.5 py-2.5 rounded-2xl border-2 border-[#FFE0D1] bg-[#FFF9F2] focus:bg-white focus:border-[#4ECDC4] focus:outline-none transition-colors"
          />
        </div>

        {/* Submit button */}
        <button
          id="complete-quest-btn"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 px-5 rounded-full text-white font-black text-base btn-vibrant-coral shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all mt-2 tracking-wide"
        >
          <Sparkles className="w-5 h-5" />
          <span>写真を投稿してクリア！ (+{quest.pts}pt)</span>
        </button>
      </div>
    </div>
  );
};
