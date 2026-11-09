import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Store, AlertTriangle, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Coupon } from '../types';

interface CouponModalProps {
  coupon: Coupon;
  onClose: () => void;
  onConfirmUse: (coupon: Coupon) => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  onClose,
  onConfirmUse,
}) => {
  const [step, setStep] = useState<'confirm' | 'display' | 'done'>('confirm');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes validity countdown

  useEffect(() => {
    let timer: any;
    if (step === 'display') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleStartRedeem = () => {
    setStep('display');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  };

  const handleFinishUse = () => {
    onConfirmUse(coupon);
    setStep('done');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFF9F2] rounded-[36px] max-w-sm w-full p-6 shadow-2xl relative border-4 border-[#FFE0D1]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="text-center pt-1">
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#FFE066] text-[#6B4E16] border border-[#FFCC00] uppercase tracking-wider">
                クーポン引き換え
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#2D3436] mt-2">
                {coupon.title}
              </h3>
              <p className="text-xs text-gray-600 font-bold mt-1 flex items-center justify-center gap-1">
                <Store className="w-3.5 h-3.5 text-[#FF9F43]" />
                <span>{coupon.shop}</span>
              </p>
            </div>

            <div className="bg-[#FFF4E5] rounded-3xl p-4.5 border-2 border-[#FFD3A3] text-xs text-[#2D3436] space-y-2">
              <div className="flex justify-between items-center font-black">
                <span>消費ポイント:</span>
                <span className="text-lg text-[#FF6B6B] font-black">{coupon.cost} pt</span>
              </div>
              <p className="text-[11px] text-[#A0522D] font-bold leading-relaxed">
                ※「クーポンを提示する」を押すとポイントが消費され、店員さん提示用画面（5分間有効）が開きます。レジでのお会計直前にお使いください。
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleStartRedeem}
                className="w-full py-3.5 px-5 rounded-full text-white font-black text-sm btn-vibrant-coral shadow-md cursor-pointer transition-all"
              >
                ポイントを使って提示画面を開く
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-5 rounded-full bg-white hover:bg-[#FFE0D1] text-[#2D3436] border-2 border-[#FFE0D1] font-black text-xs cursor-pointer transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {step === 'display' && (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4ECDC4]/20 text-[#0d9488] text-xs font-black">
              <Clock className="w-3.5 h-3.5 text-[#0d9488]" />
              <span>有効期限: {minutes}:{seconds.toString().padStart(2, '0')}</span>
            </div>

            <div>
              <p className="text-xs font-black text-gray-500">【店員さんにお見せください】</p>
              <h3 className="text-lg font-black text-[#2D3436] mt-1">
                {coupon.title}
              </h3>
              <p className="text-xs text-gray-600 font-bold mt-0.5">{coupon.shop}</p>
            </div>

            {/* Simulated Barcode */}
            <div className="bg-white border-3 border-[#2D3436] p-4 rounded-3xl shadow-inner space-y-2">
              <div className="flex justify-center items-center h-16 gap-1 px-4">
                {/* Barcode lines simulation */}
                <div className="w-1.5 h-full bg-[#2D3436]"></div>
                <div className="w-1 h-full bg-[#2D3436]"></div>
                <div className="w-2.5 h-full bg-[#2D3436]"></div>
                <div className="w-1 h-full bg-[#2D3436]"></div>
                <div className="w-2 h-full bg-[#2D3436]"></div>
                <div className="w-0.5 h-full bg-[#2D3436]"></div>
                <div className="w-3 h-full bg-[#2D3436]"></div>
                <div className="w-1.5 h-full bg-[#2D3436]"></div>
                <div className="w-2 h-full bg-[#2D3436]"></div>
                <div className="w-1 h-full bg-[#2D3436]"></div>
                <div className="w-2.5 h-full bg-[#2D3436]"></div>
                <div className="w-1.5 h-full bg-[#2D3436]"></div>
              </div>
              <p className="text-[11px] font-mono tracking-widest text-[#2D3436] font-black">
                {coupon.barcode}
              </p>
            </div>

            <p className="text-[11px] text-gray-600 bg-white border border-[#FFE0D1] rounded-2xl p-2.5 font-bold">
              店員さんに確認してもらったあと、下のボタンを押してください。
            </p>

            <button
              type="button"
              onClick={handleFinishUse}
              className="w-full py-3.5 px-5 rounded-full text-white font-black text-sm btn-vibrant-mint shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>店員さんに見せました（利用完了）</span>
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#4ECDC4]/20 text-[#0d9488] flex items-center justify-center mx-auto border-2 border-[#4ECDC4]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#2D3436]">ご利用ありがとうございました！</h3>
              <p className="text-xs text-gray-600 font-bold mt-1.5 leading-relaxed">
                「{coupon.title}」を使いました。<br />
                またロスタイムでポイントを貯めて使ってね！
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-5 rounded-full text-white font-black text-xs btn-vibrant-coral cursor-pointer transition-all"
            >
              とじる
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
