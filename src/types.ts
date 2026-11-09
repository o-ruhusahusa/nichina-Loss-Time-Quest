export type QuestMinutes = 30 | 60 | 120;

export interface Quest {
  id: string;
  title: string;
  desc: string;
  minutes: QuestMinutes;
  pts: number;
  category: 'food' | 'scenery' | 'chat' | 'exploration' | 'study';
  categoryLabel: string;
  locationHint: string;
  stationHint: string;
  tips: string;
}

export interface MemoryPost {
  id: string;
  questTitle: string;
  imageSrc: string;
  caption?: string;
  pts: number;
  createdAt: string;
  author: string;
  station: string;
  likes: number;
  isLikedByMe?: boolean;
  minutes: QuestMinutes;
}

export interface Coupon {
  id: string;
  title: string;
  shop: string;
  cost: number;
  desc: string;
  category: string;
  validUntil: string;
  barcode: string;
}

export interface RedeemedCoupon {
  id: string;
  couponId: string;
  couponTitle: string;
  shop: string;
  cost: number;
  redeemedAt: string;
  barcode: string;
}

export type ScreenType = 'home' | 'quest-detail' | 'gallery' | 'coupon';
