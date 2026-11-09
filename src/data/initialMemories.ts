import { MemoryPost } from '../types';

export const INITIAL_MEMORIES: MemoryPost[] = [
  {
    id: 'mem-1',
    questTitle: 'アイスでひんやりタイム',
    imageSrc: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80',
    caption: '油津駅のベンチで部活終わりにガリガリ君！日南の夕焼けと最高に合いました🍧',
    pts: 50,
    createdAt: '15分前',
    author: '油津高校サッカー部',
    station: '油津駅',
    likes: 14,
    isLikedByMe: false,
    minutes: 30
  },
  {
    id: 'mem-2',
    questTitle: '駅前スナップ写真',
    imageSrc: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80',
    caption: 'JR日南線の黄色い車両がちょうど入線！木造駅舎の屋根と線路のコントラストがエモい🚃✨',
    pts: 30,
    createdAt: '1時間前',
    author: '日南線フォト同好会',
    station: '飫肥駅',
    likes: 28,
    isLikedByMe: true,
    minutes: 30
  },
  {
    id: 'mem-3',
    questTitle: 'ドリンクバーで語り合い',
    imageSrc: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    caption: '次の電車まで1時間あったからテスト勉強＆進路相談。メロンソーダで乾杯しました☕️',
    pts: 100,
    createdAt: '3時間前',
    author: 'みやざきJK探検隊',
    station: '日南駅',
    likes: 21,
    isLikedByMe: false,
    minutes: 60
  },
  {
    id: 'mem-4',
    questTitle: '油津港の潮風クルーズ散歩',
    imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    caption: '2時間の待ち時間で堀川運河から港までウォーキング！潮風が気持ちよくてリフレッシュできた🌊',
    pts: 220,
    createdAt: '昨日',
    author: '週末サイクリスト',
    station: '油津駅',
    likes: 39,
    isLikedByMe: false,
    minutes: 120
  },
  {
    id: 'mem-5',
    questTitle: 'ご当地ドリンク発掘調査',
    imageSrc: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    caption: '駅の自販機でスコール発見！待ち時間の定番になりそう😋',
    pts: 40,
    createdAt: '2日前',
    author: 'カズキ@南郷',
    station: '南郷駅',
    likes: 19,
    isLikedByMe: false,
    minutes: 30
  }
];
