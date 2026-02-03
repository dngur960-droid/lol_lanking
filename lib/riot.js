const RIOT_API_KEY = process.env.RIOT_API_KEY;
const REGION_ASIA = 'asia';
const REGION_KR = 'kr';

async function getLatestVersion() {
    try {
        const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await res.json();
        return versions[0];
    } catch (e) {
        return '15.2.1';
    }
}

export async function getSummonerData(gameName, tagLine, includeMatches = false) {
    if (!RIOT_API_KEY || RIOT_API_KEY.includes('발급받은')) {
        throw new Error('API_KEY_MISSING');
    }

    const version = await getLatestVersion();

    try {
        const cleanName = gameName.trim();
        const cleanTag = tagLine.trim();

        // 1. Account-v1
        const accountRes = await fetch(
            `https://${REGION_ASIA}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(cleanName)}/${encodeURIComponent(cleanTag)}?api_key=${RIOT_API_KEY}`,
            { cache: 'no-store' }
        );

        if (accountRes.status === 401) throw new Error('API_KEY_EXPIRED');
        if (accountRes.status === 403) throw new Error('API_KEY_FORBIDDEN');
        if (accountRes.status === 429) throw new Error('RATE_LIMIT');
        if (!accountRes.ok) throw new Error('PLAYER_NOT_FOUND');

        const { puuid, gameName: realName, tagLine: realTag } = await accountRes.json();

        // 2 & 3. Summoner & League info 병렬 획득
        const [summonerRes, leagueRes] = await Promise.all([
            fetch(`https://${REGION_KR}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`, { cache: 'no-store' }),
            fetch(`https://${REGION_KR}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`, { cache: 'no-store' })
        ]);

        let profileIconId = 0;
        if (summonerRes.ok) {
            const summData = await summonerRes.json();
            profileIconId = summData.profileIconId || 0;
        }

        let tierInfo = {
            tier: 'UNRANKED',
            rank: '',
            lp: 0,
            wins: 0,
            losses: 0,
            winRate: 0
        };

        if (leagueRes.ok) {
            const leagueData = await leagueRes.json();
            const soloRank = leagueData.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
            if (soloRank) {
                tierInfo = {
                    tier: soloRank.tier,
                    rank: soloRank.rank,
                    lp: soloRank.leaguePoints,
                    wins: soloRank.wins,
                    losses: soloRank.losses,
                    winRate: Math.round((soloRank.wins / (soloRank.wins + soloRank.losses)) * 100)
                };
            }
        }

        // 4. Match-v5 (전적 조회 요청 시에만)
        let matchHistory = [];
        if (includeMatches) {
            const matchIdsRes = await fetch(
                `https://${REGION_ASIA}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${RIOT_API_KEY}`,
                { cache: 'no-store' }
            );
            if (matchIdsRes.ok) {
                const matchIds = await matchIdsRes.json();
                matchHistory = await Promise.all(
                    matchIds.map(async (matchId) => {
                        try {
                            const detailRes = await fetch(`https://${REGION_ASIA}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`, { cache: 'no-store' });
                            if (!detailRes.ok) return null;
                            const detail = await detailRes.json();
                            const p = detail.info.participants.find(part => part.puuid === puuid);
                            return {
                                id: matchId,
                                champion: p.championName,
                                win: p.win,
                                kda: `${p.kills}/${p.deaths}/${p.assists}`,
                                date: new Date(detail.info.gameCreation).toLocaleDateString()
                            };
                        } catch (e) { return null; }
                    })
                );
                matchHistory = matchHistory.filter(Boolean);
            }
        }

        return {
            puuid,
            name: realName || cleanName,
            tag: realTag || cleanTag,
            profileIcon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`,
            ...tierInfo,
            matchHistory,
            version
        };
    } catch (error) {
        console.error(`[RIOT API ERROR] ${gameName}#${tagLine}:`, error.message);
        throw error;
    }
}
