import { Quest } from '../types';

export const QUESTS: Record<30 | 60 | 120, Quest[]> = {
  30: [
    {
      id: 'q-30-1',
      title: 'アイスでひんやりタイム',
      desc: '近くのコンビニでお気に入りアイスを買って友達や青空と一緒に写真を撮ろう！',
      minutes: 30,
      pts: 50,
      category: 'food',
      categoryLabel: 'ひんやりスイーツ',
      locationHint: '駅前コンビニ・商店街',
      stationHint: '油津駅・飫肥駅・日南駅周辺',
      tips: '溶ける前にパシャリ！友達と違う味を買ってシェアするのもおすすめ'
    },
    {
      id: 'q-30-2',
      title: '駅前スナップ写真',
      desc: '駅前のお気に入りの風景や友達の笑顔、レトロな駅名標をパシャリ！',
      minutes: 30,
      pts: 30,
      category: 'scenery',
      categoryLabel: '駅前スナップ',
      locationHint: 'JR日南線 各駅前・ホーム',
      stationHint: '日南線全駅（飫肥・油津・日南・南郷など）',
      tips: '夕方の光や日南線の黄色いディーゼル車が映り込むとエモさ倍増！'
    },
    {
      id: 'q-30-3',
      title: 'ご当地ドリンク発掘調査',
      desc: '駅前自販機で「ヨーグルッペ」や「愛のスコール」など宮崎ならではのドリンクを探して撮影しよう！',
      minutes: 30,
      pts: 40,
      category: 'food',
      categoryLabel: 'ご当地ドリンク',
      locationHint: '駅構内・待合室自販機',
      stationHint: '飫肥駅・油津駅',
      tips: '缶やボトルのパッケージを背景の駅舎と一緒に撮ってみてね'
    },
    {
      id: 'q-30-4',
      title: '飫肥杉の温もりハント',
      desc: '駅や広場にある飫肥杉（おびすぎ）のベンチや看板を見つけて、木の温もりを撮影！',
      minutes: 30,
      pts: 45,
      category: 'exploration',
      categoryLabel: '飫肥杉みっけ',
      locationHint: '駅前待合所・観光広場',
      stationHint: '飫肥駅・日南駅',
      tips: '綺麗な木目や、杉の香りに注目してみて'
    },
    {
      id: 'q-30-5',
      title: '青空深呼吸スナップ',
      desc: 'ホームや駅前広場で日南の澄んだ南国の空を見上げて、心地よい空の写真をパシャリ！',
      minutes: 30,
      pts: 35,
      category: 'scenery',
      categoryLabel: 'リフレッシュ',
      locationHint: '駅前広場・ホーム',
      stationHint: '日南線全駅',
      tips: '待ち時間ののんびりした雲の流れを収めよう'
    }
  ],
  60: [
    {
      id: 'q-60-1',
      title: 'ドリンクバーで語り合い',
      desc: '近くのお店でドリンクバーを飲みながら、放課後トークや作戦会議を楽しもう！',
      minutes: 60,
      pts: 100,
      category: 'chat',
      categoryLabel: '放課後カフェ',
      locationHint: '駅周辺ファミレス・カフェ',
      stationHint: '油津駅・日南駅周辺',
      tips: 'グラスを乾杯した写真や、勉強ノートを広げたショットでクリア報告！'
    },
    {
      id: 'q-60-2',
      title: 'レトロ商店街ぶらり散歩',
      desc: '油津のアーケードや飫肥の通りをのんびり歩いて、どこか懐かしい看板や路地を発見しよう！',
      minutes: 60,
      pts: 80,
      category: 'exploration',
      categoryLabel: '街歩き発見',
      locationHint: '油津商店街・飫肥本町',
      stationHint: '油津駅（徒歩5分）・飫肥駅（徒歩10分）',
      tips: '昭和レトロなフォントの看板や、猫がいる路地がシャッターチャンス！'
    },
    {
      id: 'q-60-3',
      title: '日南名物「おび天」食べ比べ',
      desc: 'ほんのり甘くて香ばしい日南のソウルフード「おび天」や厚焼き卵をテイクアウトして味見！',
      minutes: 60,
      pts: 110,
      category: 'food',
      categoryLabel: 'ご当地グルメ',
      locationHint: '飫肥城下町・駅前商店',
      stationHint: '飫肥駅・油津駅周辺',
      tips: '揚げたてを包み紙と一緒に撮ると美味しそうに映えるよ'
    },
    {
      id: 'q-60-4',
      title: '集中！駅カフェ宿題スクワット',
      desc: '待ち時間の40分間、集中して宿題や単語帳・読書を進めよう。今日の頑張りをノート写真で報告！',
      minutes: 60,
      pts: 90,
      category: 'study',
      categoryLabel: '待ち時間スタディ',
      locationHint: '駅待合室・地域交流スペース',
      stationHint: '油津yotten・飫肥駅待合室',
      tips: 'ペンとノートを並べて「ロスタイム勉強完了」と宣言しよう'
    }
  ],
  120: [
    {
      id: 'q-120-1',
      title: 'じっくりロスタイム満喫',
      desc: '友達とおやつを持ち寄って、待ち時間限定のプチお茶会＆フォトコンテストを開催しよう！',
      minutes: 120,
      pts: 200,
      category: 'chat',
      categoryLabel: 'プチパーティー',
      locationHint: '駅前広場ベンチ・近隣公園',
      stationHint: '日南駅・油津駅・飫肥駅',
      tips: '持ち寄ったお菓子を並べて「ロスタイム最高！」のポーズで激写！'
    },
    {
      id: 'q-120-2',
      title: '油津港の潮風クルーズ散歩',
      desc: '油津駅から港まで足をのばして、停泊する漁船や赤い灯台、雄大な海景色を写真に収めよう！',
      minutes: 120,
      pts: 220,
      category: 'exploration',
      categoryLabel: '港町アドベンチャー',
      locationHint: '油津港・堀川運河周辺',
      stationHint: '油津駅（徒歩15分）',
      tips: '堀川運河のレトロな赤レンガ館や石橋は宮崎屈指の映えスポット！'
    },
    {
      id: 'q-120-3',
      title: '飫肥城下町の歴史トラベル',
      desc: '飫肥城の大手門や苔むす石垣、鯉が泳ぐ水路を巡って、城下町のタイムスリップ写真を撮ろう！',
      minutes: 120,
      pts: 250,
      category: 'exploration',
      categoryLabel: '歴史・名所巡り',
      locationHint: '飫肥城址・武家屋敷通り',
      stationHint: '飫肥駅（徒歩15分）',
      tips: '2時間あれば城下町を一周できます。帰りの電車時刻を必ずチェックしてね！'
    },
    {
      id: 'q-120-4',
      title: '地元食堂の絶品チキン南蛮ハント',
      desc: '日南の地元食堂や喫茶店に入って、ボリューム満点のチキン南蛮やうどんで贅沢ロスタイム！',
      minutes: 120,
      pts: 230,
      category: 'food',
      categoryLabel: '日南ランチ探訪',
      locationHint: '駅周辺の定食屋・喫茶店',
      stationHint: '日南駅・油津駅周辺',
      tips: 'タルタルソースたっぷりの一皿を美味しく激写！'
    }
  ]
};

export const NICHINAN_STATIONS = [
  { id: 'aburatsu', name: '油津駅', line: 'JR日南線', note: 'カープ一本松＆商店街' },
  { id: 'obi', name: '飫肥駅', line: 'JR日南線', note: '飫肥城下町・小京都' },
  { id: 'nichinan', name: '日南駅', line: 'JR日南線', note: '日南市中心街' },
  { id: 'nango', name: '南郷駅', line: 'JR日南線', note: 'ライオンズ南郷スタジアム' },
  { id: 'ibii', name: '伊比井駅', line: 'JR日南線', note: '鵜戸神宮方面' },
  { id: 'kitago', name: '北郷駅', line: 'JR日南線', note: '北郷温泉郷' },
];
