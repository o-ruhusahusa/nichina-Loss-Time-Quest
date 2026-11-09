import { Coupon } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-drinkbar',
    title: 'ドリンクバー100円引き',
    shop: '日南駅前 ファミレス＆カフェ',
    cost: 100,
    desc: '放課後の語り合いやテスト勉強のお供に！ドリンクバー単品またはセット注文時に使えます。',
    category: 'カフェ・ドリンク',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-DRINK-100-OFF'
  },
  {
    id: 'c-ice',
    title: 'コンビニ公式アイス50円引き',
    shop: '油津駅前・飫肥駅前 提携コンビニ各店',
    cost: 50,
    desc: 'お好きなカップアイス・バーアイス各種に利用可能。待ち時間のクールダウンにぴったり！',
    category: 'スイーツ',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-ICE-50-OFF'
  },
  {
    id: 'c-obiten',
    title: '日南名物「おび天」1個プレゼント',
    shop: '飫肥城下町 おび天本舗・提携売店',
    cost: 150,
    desc: '日南伝統の味！魚のすり身に豆腐と黒砂糖を練り込んで揚げた、ふんわり甘い名物おやつ。500円以上お買い上げで1個プレゼント。',
    category: 'ご当地名物',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-OBITEN-FREE-1'
  },
  {
    id: 'c-fries',
    title: 'フライドポテトSサイズ無料引換',
    shop: '油津Yotten カフェコーナー',
    cost: 120,
    desc: '揚げたてホクホクのポテトをプレゼント！友達とシェアして待ち時間をもっと楽しく。',
    category: 'フード',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-FRIES-GIFT'
  },
  {
    id: 'c-snack',
    title: '駅売店お菓子・ドリンク50円引き',
    shop: '日南市各駅キヨスク・駅前売店',
    cost: 50,
    desc: '200円以上のお菓子または宮崎ご当地ドリンクの購入時に50円値引き！',
    category: '売店・スナック',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-KIOSK-50'
  },
  {
    id: 'c-bakery',
    title: '焼きたてパン30円引きクーポン',
    shop: '油津レトロベーカリー',
    cost: 70,
    desc: '地元で愛されるパン屋さんの人気惣菜パン・メロンパンなどに使えるお得な割引券。',
    category: 'ベーカリー',
    validUntil: '2026-12-31',
    barcode: 'NICHINAN-BAKERY-30'
  }
];
