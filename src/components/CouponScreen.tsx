import React, { useState } from 'react';
import { Tag, Sparkles, AlertCircle, CheckCircle2, Store, Clock } from 'lucide-react';
import { Coupon, RedeemedCoupon } from '../types';
import { CouponModal } from './CouponModal';

interface CouponScreenProps {
  points: number;
  coupons: Coupon[];
  redeemedHistory: RedeemedCoupon[];
  onUseCoupon: (coupon: Coupon) => void;
}

export const CouponScreen: React.FC<CouponScreenProps> = ({
  points,
  coupons,
  redeemedHistory,
  onUseCoupon,
}) => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [insufficientError, setInsufficientError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');

  const handleAttemptUse = (coupon: Coupon) => {
    if (points >= coupon.cost) {
      setInsufficientError(null);
      setSelectedCoupon(coupon);
    } else {
      setInsufficientError(
        `「${coupon.title}」を使うにはあと ${coupon.cost - points} pt 必要です！`
      );
      setTimeout(() => {
        setInsufficientError(null);
      }, 4000);
    }
  };

  return (
    <div id="coupon-screen" className="space-y-4 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#2D3436] leading-tight">
            お得なクーポン
          </h2>
          <p className="text-xs font-bold text-gray-500">
            ロスタイムで貯めたポイントを街の割引チケットに交換！
          </p>
        </div>
        <div className="bg-[#FFE066] border-2 border-[#FFCC00] rounded-2xl px-3.5 py-1.5 text-right shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#A0522D] block">YOUR POINTS</span>
          <span className="text-base font-black text-[#6B4E16]">{points} pt</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#FFE0D1] text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('available')}
          className={`py-2 px-4 font-black transition-colors ${
            activeTab === 'available'
              ? 'border-b-4 border-[#FF6B6B] text-[#FF6B6B]'
              : 'text-gray-500 hover:text-[#2D3436]'
          }`}
        >
          引き換え可能 ({coupons.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-2 px-4 font-black transition-colors ${
            activeTab === 'history'
              ? 'border-b-4 border-[#FF6B6B] text-[#FF6B6B]'
              : 'text-gray-500 hover:text-[#2D3436]'
          }`}
        >
          使った履歴 ({redeemedHistory.length})
        </button>
      </div>

      {/* Error alert for insufficient points */}
      {insufficientError && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="font-bold">{insufficientError}</span>
        </div>
      )}

      {activeTab === 'available' ? (
        <div className="space-y-3.5">
          {coupons.map((coupon) => {
            const canAfford = points >= coupon.cost;

            return (
              <div
                key={coupon.id}
                className="card border-2 border-[#FFD3A3] p-5 rounded-3xl bg-[#FFF4E5] shadow-xs space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-white text-[#FF9F43] border border-[#FFD3A3] uppercase tracking-wider">
                      {coupon.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#2D3436] mt-1.5">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-bold flex items-center gap-1.5 mt-0.5">
                      <Store className="w-3.5 h-3.5 text-[#FF9F43]" />
                      <span>{coupon.shop}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-gray-500 block font-black uppercase">COST</span>
                    <span className="text-xl font-black text-[#FF6B6B]">
                      {coupon.cost} <span className="text-xs font-bold text-gray-500 uppercase">pt</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-bold leading-relaxed bg-white/90 rounded-2xl p-3 border border-[#FFD3A3]/60">
                  {coupon.desc}
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleAttemptUse(coupon)}
                    className={`w-full py-3.5 px-5 rounded-full font-black text-sm cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      canAfford
                        ? 'btn-vibrant-mint text-white shadow-md'
                        : 'bg-white text-gray-400 border-2 border-[#FFE0D1] hover:bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    <span>{canAfford ? 'クーポンを使う' : `ポイントが足りません (${coupon.cost}pt)`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {redeemedHistory.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-[#FFE0D1] p-6 space-y-2 text-gray-400">
              <Clock className="w-9 h-9 mx-auto text-[#FFD3A3] mb-1" />
              <p className="text-sm font-black text-[#2D3436]">利用履歴はまだありません</p>
              <p className="text-xs font-bold text-gray-500">ポイントを貯めてクーポンを使ってみてね！</p>
            </div>
          ) : (
            redeemedHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-[#FFE0D1] rounded-3xl p-4 shadow-xs flex items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ECDC4]" />
                    <h4 className="text-xs sm:text-sm font-black text-[#2D3436]">{item.couponTitle}</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 font-bold pl-6">
                    {item.shop} • {item.redeemedAt}
                  </p>
                </div>
                <span className="text-xs font-black text-[#FF6B6B] bg-[#FFF9F2] px-3 py-1 rounded-full border border-[#FFE0D1]">
                  -{item.cost}pt
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal for barcode display */}
      {selectedCoupon && (
        <CouponModal
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
          onConfirmUse={(coupon) => {
            onUseCoupon(coupon);
          }}
        />
      )}
    </div>
  );
};
