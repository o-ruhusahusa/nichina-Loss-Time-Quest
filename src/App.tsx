/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { QuestDetailScreen } from './components/QuestDetailScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { CouponScreen } from './components/CouponScreen';
import { NavigationBar } from './components/NavigationBar';
import { Quest, MemoryPost, Coupon, RedeemedCoupon, ScreenType } from './types';
import { INITIAL_COUPONS } from './data/coupons';
import { INITIAL_MEMORIES } from './data/initialMemories';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Points state with localStorage persistence
  const [points, setPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nichinan_quest_points');
      return saved !== null ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Selected Station
  const [selectedStation, setSelectedStation] = useState<string>(() => {
    try {
      return localStorage.getItem('nichinan_selected_station') || '油津駅';
    } catch {
      return '油津駅';
    }
  });

  // Active Quest
  const [activeQuest, setActiveQuest] = useState<Quest | null>(() => {
    try {
      const saved = localStorage.getItem('nichinan_active_quest');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Current Screen
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // Memories list
  const [memories, setMemories] = useState<MemoryPost[]>(() => {
    try {
      const saved = localStorage.getItem('nichinan_memories');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  // Coupons
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // Redeemed coupons history
  const [redeemedHistory, setRedeemedHistory] = useState<RedeemedCoupon[]>(() => {
    try {
      const saved = localStorage.getItem('nichinan_redeemed_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notification Toast
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info';
  } | null>(null);

  // Sync points to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nichinan_quest_points', points.toString());
    } catch {
      // ignore
    }
  }, [points]);

  // Sync activeQuest to localStorage
  useEffect(() => {
    try {
      if (activeQuest) {
        localStorage.setItem('nichinan_active_quest', JSON.stringify(activeQuest));
      } else {
        localStorage.removeItem('nichinan_active_quest');
      }
    } catch {
      // ignore
    }
  }, [activeQuest]);

  // Sync memories
  useEffect(() => {
    try {
      localStorage.setItem('nichinan_memories', JSON.stringify(memories));
    } catch {
      // ignore
    }
  }, [memories]);

  // Sync station
  useEffect(() => {
    try {
      localStorage.setItem('nichinan_selected_station', selectedStation);
    } catch {
      // ignore
    }
  }, [selectedStation]);

  // Sync redeemedHistory
  useEffect(() => {
    try {
      localStorage.setItem('nichinan_redeemed_history', JSON.stringify(redeemedHistory));
    } catch {
      // ignore
    }
  }, [redeemedHistory]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Quest Actions
  const handleStartQuest = (quest: Quest) => {
    setActiveQuest(quest);
    setCurrentScreen('quest-detail');
  };

  const handleCompleteQuest = (
    newPost: Omit<MemoryPost, 'id' | 'createdAt' | 'likes' | 'isLikedByMe'>
  ) => {
    const post: MemoryPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      createdAt: 'たった今',
      likes: 1,
      isLikedByMe: true,
    };

    // Update state
    setPoints((prev) => prev + post.pts);
    setMemories((prev) => [post, ...prev]);
    setActiveQuest(null);

    showToast(`クエストクリア！ ${post.pts}pt 獲得しました！`);
    setCurrentScreen('gallery');
  };

  const handleCancelQuest = () => {
    setCurrentScreen('home');
  };

  // Coupon Actions
  const handleUseCoupon = (coupon: Coupon) => {
    setPoints((prev) => Math.max(0, prev - coupon.cost));

    const redeemedItem: RedeemedCoupon = {
      id: `redeem-${Date.now()}`,
      couponId: coupon.id,
      couponTitle: coupon.title,
      shop: coupon.shop,
      cost: coupon.cost,
      redeemedAt: new Date().toLocaleTimeString('ja-JP', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      barcode: coupon.barcode,
    };

    setRedeemedHistory((prev) => [redeemedItem, ...prev]);
    showToast(`「${coupon.title}」を使いました！店員さんに見せてね。`);
  };

  // Like Action
  const handleToggleLike = (postId: string) => {
    setMemories((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          const isLiked = !item.isLikedByMe;
          return {
            ...item,
            isLikedByMe: isLiked,
            likes: isLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F0EAE1] flex justify-center text-[#2D3436]">
      <div className="app-container w-full max-w-[480px] min-h-screen bg-[#FFF9F2] flex flex-col shadow-2xl relative border-x-2 border-[#FFE0D1]">
        {/* Header with points and station picker */}
        <Header
          points={points}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 pb-8 overflow-y-auto">
          {currentScreen === 'home' && (
            <HomeScreen
              onStartQuest={handleStartQuest}
              activeQuest={activeQuest}
              onResumeActiveQuest={() => setCurrentScreen('quest-detail')}
              selectedStation={selectedStation}
            />
          )}

          {currentScreen === 'quest-detail' && (
            <QuestDetailScreen
              quest={activeQuest}
              selectedStation={selectedStation}
              onCompleteQuest={handleCompleteQuest}
              onCancelQuest={handleCancelQuest}
            />
          )}

          {currentScreen === 'gallery' && (
            <GalleryScreen
              memories={memories}
              onToggleLike={handleToggleLike}
            />
          )}

          {currentScreen === 'coupon' && (
            <CouponScreen
              points={points}
              coupons={coupons}
              redeemedHistory={redeemedHistory}
              onUseCoupon={handleUseCoupon}
            />
          )}
        </main>

        {/* Floating Notification Toast */}
        {notification && (
          <div className="fixed top-16 z-50 left-1/2 -translate-x-1/2 max-w-[90%] w-full sm:max-w-md px-4 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="bg-[#2D3436] text-white backdrop-blur-xs px-4.5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border-2 border-[#FFE0D1] pointer-events-auto">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#4ECDC4] shrink-0" />
                <span className="text-xs font-black leading-tight">
                  {notification.message}
                </span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <NavigationBar
          currentScreen={currentScreen}
          onSwitchScreen={setCurrentScreen}
          hasActiveQuest={activeQuest !== null}
        />
      </div>
    </div>
  );
}
