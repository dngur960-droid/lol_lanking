export const TOP_MEMBERS = [
    {
        id: 1,
        rank: 1,
        name: 'Xerath Main',
        tier: 'Challenger',
        rankEmoji: '🏆',
        winRate: 50,
        kda: '2.03 / 1.36 / 6.1',
        mostChampion: 'Xerath',
        accentColor: '#c89b3c'
    },
    {
        id: 2,
        rank: 2,
        name: 'JinxBot',
        tier: 'Diamond I',
        rankEmoji: '🥈',
        winRate: 99,
        kda: '1.00 / 1.78 / 1.7',
        mostChampion: 'Jinx',
        accentColor: '#a0a0b0'
    },
    {
        id: 3,
        rank: 3,
        name: 'TopGap',
        tier: 'Platinum III',
        rankEmoji: '🥉',
        winRate: 35,
        kda: '3.00 / 1.78 / 1.7',
        mostChampion: 'Darius',
        accentColor: '#cd7f32'
    }
];

export const ALL_MEMBERS = [
    ...TOP_MEMBERS,
    {
        id: 4,
        rank: 4,
        name: 'Support diff',
        tier: 'Gold II',
        winRate: 48,
        kda: '4.5 / 2.1 / 1.3',
        mostChampion: 'Thresh'
    },
    {
        id: 5,
        rank: 5,
        name: 'Jungle King',
        tier: 'Silver I',
        winRate: 52,
        kda: '3.2 / 4.4 / 2.1',
        mostChampion: 'Lee Sin'
    },
    {
        id: 6,
        rank: 6,
        name: 'NoWards',
        tier: 'Bronze IV',
        winRate: 45,
        kda: '1.5 / 8.2 / 0.9',
        mostChampion: 'Yasuo'
    }
];

export const MOCK_MATCH_HISTORY = {
    1: [
        { id: 'm1', champion: 'Xerath', win: true, kda: '10/2/15', items: [3089, 3157, 3135, 3020, 4637, 3152], date: '20분 전' },
        { id: 'm2', champion: 'Xerath', win: false, kda: '3/5/2', items: [3089, 3157, 3135, 3020, 0, 0], date: '1시간 전' },
        { id: 'm3', champion: 'Velkoz', win: true, kda: '8/0/12', items: [6653, 3157, 3135, 3020, 4637, 0], date: '3시간 전' },
    ],
    2: [
        { id: 'm4', champion: 'Jinx', win: true, kda: '15/1/5', items: [6672, 3031, 3046, 3006, 0, 0], date: '10분 전' },
        { id: 'm5', champion: 'Jinx', win: true, kda: '12/3/8', items: [6672, 3031, 3046, 3006, 3094, 0], date: '40분 전' },
    ],
    3: [
        { id: 'm6', champion: 'Darius', win: false, kda: '1/7/2', items: [6631, 3047, 0, 0, 0, 0], date: '5분 전' },
        { id: 'm7', champion: 'Darius', win: true, kda: '8/2/4', items: [6631, 3047, 3053, 3065, 0, 0], date: '2시간 전' },
    ]
};
