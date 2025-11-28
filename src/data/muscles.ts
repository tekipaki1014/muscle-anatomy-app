import type { Muscle } from '../types';

export const MUSCLES: Muscle[] = [
    // Shoulder Girdle
    {
        id: 'deltoid',
        name: '三角筋',
        nameEn: 'Deltoid',
        origin: '鎖骨外側1/3、肩峰、肩甲棘',
        insertion: '上腕骨の三角筋粗面',
        innervation: '腋窩神経',
        segment: 'C5, C6',
        category: 'shoulder'
    },
    {
        id: 'supraspinatus',
        name: '棘上筋',
        nameEn: 'Supraspinatus',
        origin: '肩甲骨の棘上窩',
        insertion: '上腕骨の大結節',
        innervation: '肩甲上神経',
        segment: 'C5, C6',
        category: 'shoulder'
    },
    {
        id: 'infraspinatus',
        name: '棘下筋',
        nameEn: 'Infraspinatus',
        origin: '肩甲骨の棘下窩',
        insertion: '上腕骨の大結節',
        innervation: '肩甲上神経',
        segment: 'C5, C6',
        category: 'shoulder'
    },
    {
        id: 'teres-minor',
        name: '小円筋',
        nameEn: 'Teres Minor',
        origin: '肩甲骨の外側縁',
        insertion: '上腕骨の大結節',
        innervation: '腋窩神経',
        segment: 'C5, C6',
        category: 'shoulder'
    },
    {
        id: 'subscapularis',
        name: '肩甲下筋',
        nameEn: 'Subscapularis',
        origin: '肩甲骨の肩甲下窩',
        insertion: '上腕骨の小結節',
        innervation: '肩甲下神経',
        segment: 'C5, C6',
        category: 'shoulder'
    },

    // Arm
    {
        id: 'biceps',
        name: '上腕二頭筋',
        nameEn: 'Biceps Brachii',
        origin: '長頭：肩甲骨の関節上結節、短頭：肩甲骨の烏口突起',
        insertion: '橈骨粗面、上腕二頭筋腱膜',
        innervation: '筋皮神経',
        segment: 'C5, C6',
        category: 'arm'
    },
    {
        id: 'triceps',
        name: '上腕三頭筋',
        nameEn: 'Triceps Brachii',
        origin: '長頭：肩甲骨の関節下結節、外側頭：上腕骨後面、内側頭：上腕骨後面',
        insertion: '尺骨の肘頭',
        innervation: '橈骨神経',
        segment: 'C6, C7, C8',
        category: 'arm'
    },
    {
        id: 'brachialis',
        name: '上腕筋',
        nameEn: 'Brachialis',
        origin: '上腕骨前面の下半分',
        insertion: '尺骨粗面',
        innervation: '筋皮神経',
        segment: 'C5, C6',
        category: 'arm'
    },

    // Forearm (Flexors)
    {
        id: 'pronator-teres',
        name: '円回内筋',
        nameEn: 'Pronator Teres',
        origin: '上腕骨内側上顆、尺骨の鉤状突起',
        insertion: '橈骨外側面の中央部',
        innervation: '正中神経',
        segment: 'C6, C7',
        category: 'forearm'
    },
    {
        id: 'flexor-carpi-radialis',
        name: '橈側手根屈筋',
        nameEn: 'Flexor Carpi Radialis',
        origin: '上腕骨内側上顆',
        insertion: '第2・3中手骨底',
        innervation: '正中神経',
        segment: 'C6, C7',
        category: 'forearm'
    },

    // Forearm (Extensors)
    {
        id: 'brachioradialis',
        name: '腕橈骨筋',
        nameEn: 'Brachioradialis',
        origin: '上腕骨外側上顆稜',
        insertion: '橈骨茎状突起',
        innervation: '橈骨神経',
        segment: 'C5, C6',
        category: 'forearm'
    },
    {
        id: 'extensor-carpi-radialis-longus',
        name: '長橈側手根伸筋',
        nameEn: 'Extensor Carpi Radialis Longus',
        origin: '上腕骨外側上顆稜',
        insertion: '第2中手骨底',
        innervation: '橈骨神経',
        segment: 'C6, C7',
        category: 'forearm'
    }
];
