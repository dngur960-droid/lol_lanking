'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const INITIAL_MEMBERS = [
    { name: '펌핑치약', tag: 'Kr1' }, { name: '펭 윤', tag: '1108' }, { name: '풍자친구 신기루', tag: 'KR12' },
    { name: '하 루', tag: '2053' }, { name: '하륭구', tag: '4878' }, { name: '햄스땃쥐', tag: '찍찍찍' },
    { name: '허드레박', tag: '보드레박' }, { name: '화 랑', tag: '3297' }, { name: 'Bdd2025롤드컵우승', tag: 'KR1' },
    { name: 'Dae zi', tag: 'kr1' }, { name: 'eastlight', tag: 'kr3' }, { name: 'vvovvi', tag: 'kr1' },
    { name: '짜 로', tag: 'papa' }, { name: '찬 영', tag: '너가못했어' }, { name: '철쮜', tag: 'kr1' },
    { name: '초록개구리짱구', tag: 'GR1' }, { name: '최 지', tag: 'KR2' }, { name: '최승현', tag: '최승현' },
    { name: '카롱', tag: 'cutie' }, { name: '캐 럿', tag: 'M V' }, { name: '태릉인', tag: 'kr1' },
    { name: '통 키', tag: '충 신' }, { name: '파카알', tag: 'kr1' }, { name: '에구궁거긴', tag: '할매카레' },
    { name: '오늘은 작스트랩', tag: 'kr123' }, { name: '올때메로나', tag: '147' }, { name: '으효닝', tag: 'KR1' },
    { name: '은 고', tag: 'EUNGO' }, { name: '은평번식왕박찬웅', tag: 'kr1' }, { name: '음주가무포로리', tag: 'kr1' },
    { name: '이 지', tag: 'ezpz' }, { name: '인절미설빙', tag: 'KR1' }, { name: '잇 진', tag: 'kr1' },
    { name: '장원영', tag: '인간우미우' }, { name: '제육볶음', tag: '어떻해' }, { name: '조이는 보이', tag: '5882' },
    { name: '족제비', tag: 'kr1' }, { name: '줄 기', tag: '1004' }, { name: '살아눈부시게', tag: 'kr1' },
    { name: '상동불나방', tag: 'KR1' }, { name: '서경수', tag: '뮤아이' }, { name: '서혜꽃', tag: 'kr1' },
    { name: '세럼이 먼저다', tag: 'KR1' }, { name: '소라카의신부수업', tag: 'KR1' }, { name: '손슬픔', tag: '슬픔이' },
    { name: '수달은 끼잉끼잉', tag: 'KR1' }, { name: '수리 장', tag: 'kr1' }, { name: '숙명여대 김고은', tag: 'kr1' },
    { name: '신림동박연진', tag: 'kr1' }, { name: '아나줘', tag: 'KR1' }, { name: '아방가르동', tag: 'KR1' },
    { name: '악 마', tag: '121' }, { name: '어 데', tag: 'Kr2' }, { name: '막강주니', tag: 'kr4' },
    { name: '맨릿 수유점 남일', tag: 'KR3' }, { name: '메가 제라오라', tag: '807' }, { name: '몽글망곰', tag: 'KR1' },
    { name: '무지개 이또', tag: '123' }, { name: '민 성', tag: '불친절함' }, { name: '바텀안해요', tag: 'npnc' },
    { name: '바 득', tag: '바득' }, { name: '박 형', tag: '한량지망생' }, { name: '백설양', tag: '프리렌' },
    { name: '버 디', tag: 'CUTE' }, { name: '분당아이린', tag: 'kr1' }, { name: '뽀보리', tag: 'KR1' },
    { name: '사브리나', tag: '카펜터' }, { name: '사 펑', tag: 'K R' }, { name: '김살슈', tag: 'KR1' },
    { name: '김치왕만두다', tag: 'KR1' }, { name: '꾸스트라다무스', tag: 'KR1' }, { name: '뀨잇뀨', tag: 'KR1' },
    { name: '나름이네', tag: '7229' }, { name: '난단짠단짝', tag: 'KR1' }, { name: '남남용', tag: 'KR1' },
    { name: '네오단', tag: 'KR1' }, { name: '노인간', tag: 'KR1' }, { name: '눈의꽃', tag: 'KR7' },
    { name: '다뺏겨난백경', tag: 'KR1' }, { name: '달디단 밤양갱', tag: '0213' }, { name: '대방어', tag: '노수현' },
    { name: '대창민', tag: '000' }, { name: '루콧', tag: 'KR1' }, { name: '정우혁', tag: 'KR1' },
    { name: 'CON', tag: 'SIL' }, { name: '구미호', tag: 'K R' }, { name: '바게트', tag: 'K R' },
    { name: '감자탕', tag: '맛있어' }, { name: '게으른으른이에요', tag: 'kr1' }, { name: '계란도른자', tag: '도른자' },
    { name: '교촌치킨레드', tag: '6974' }, { name: '군플', tag: 'kr1' }, { name: '금빛두더지', tag: 'KR1' },
    { name: '급하게바꾼닉네임', tag: 'KR1' }, { name: '길길이', tag: 'kr1' }, { name: '김게로', tag: 'KR2' },
    { name: '김깨갱', tag: 'KR1' }, { name: '김목마', tag: 'KR1' }
];

export default function Home() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentLoadingName, setCurrentLoadingName] = useState('');

    const abortRef = useRef(false);

    useEffect(() => {
        // 초대형 업그레이드: 서버 고용 저장소(KV)에서 데이터를 먼저 가져옵니다.
        async function loadSharedData() {
            setLoading(true);
            try {
                const res = await fetch('/api/kv');
                const data = await res.json();
                if (data.members && data.members.length > 0) {
                    setMembers(sortAndRankMembers(data.members));
                    setLastUpdated(data.lastUpdated);
                } else {
                    // 서버에 데이터가 아예 없는 경우 첫 갱신 유도
                    fetchAllMembers();
                }
            } catch (e) {
                console.error('KV 로드 실패:', e);
            } finally {
                setLoading(false);
            }
        }
        loadSharedData();
        return () => { abortRef.current = true; };
    }, []);

    const sortAndRankMembers = (dataList) => {
        return [...dataList]
            .map(r => ({
                ...r,
                sortValue: getSortValue(r.tier || 'UNRANKED', r.rank || '', r.lp || 0, !!r.error)
            }))
            .sort((a, b) => b.sortValue - a.sortValue)
            .map((r, idx) => ({
                ...r,
                overallRank: r.error && !r.tier ? null : idx + 1
            }));
    };

    const fetchAllMembers = async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        setProgress(0);
        abortRef.current = false;

        const currentDataMap = new Map();
        members.forEach(m => currentDataMap.set(`${m.name}#${m.tag}`, m));

        const updatedData = [];

        for (let i = 0; i < INITIAL_MEMBERS.length; i++) {
            if (abortRef.current) break;

            const m = INITIAL_MEMBERS[i];
            setCurrentLoadingName(`${m.name}#${m.tag}`);

            try {
                const res = await fetch(`/api/member?name=${encodeURIComponent(m.name)}&tag=${encodeURIComponent(m.tag)}`);
                const data = await res.json();

                if (data.error) {
                    const existing = currentDataMap.get(`${m.name}#${m.tag}`);
                    updatedData.push(existing || { ...m, error: true, errorMsg: data.error });
                } else {
                    updatedData.push(data);
                }
            } catch (e) {
                const existing = currentDataMap.get(`${m.name}#${m.tag}`);
                updatedData.push(existing || { ...m, error: true });
            }

            const currentProgress = Math.round(((i + 1) / INITIAL_MEMBERS.length) * 100);
            setProgress(currentProgress);

            // 실시간 리마인드
            setMembers(sortAndRankMembers([...updatedData, ...INITIAL_MEMBERS.slice(i + 1).map(rem => currentDataMap.get(`${rem.name}#${rem.tag}`) || rem)]));

            if (i < INITIAL_MEMBERS.length - 1) {
                await new Promise(resolve => setTimeout(resolve, i % 5 === 0 ? 5000 : 3500));
            }
        }

        if (!abortRef.current) {
            const now = new Date().toLocaleString();
            setLastUpdated(now);

            // 핵심: 갱신이 끝나면 서버 공용 저장소(KV)에 저장하여 모두와 공유합니다.
            try {
                await fetch('/api/kv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ members: updatedData, lastUpdated: now })
                });
            } catch (e) {
                console.error('KV 저장 실패:', e);
            }
        }

        setIsRefreshing(false);
        setCurrentLoadingName('');
    };

    const getSortValue = (tier, rank, lp, hasError) => {
        const tiers = {
            'CHALLENGER': 1000000, 'GRANDMASTER': 900000, 'MASTER': 800000,
            'DIAMOND': 700000, 'EMERALD': 600000, 'PLATINUM': 500000,
            'GOLD': 400000, 'SILVER': 300000, 'BRONZE': 200000,
            'IRON': 100000, 'UNRANKED': 0, 'RESTRICTED': -100
        };
        const ranks = { 'I': 4000, 'II': 3000, 'III': 2000, 'IV': 1000 };
        return (tiers[tier] || 0) + (ranks[rank] || 0) + lp;
    };

    const getDisplayTier = (tier, rank) => {
        if (!tier || tier === 'UNRANKED') return 'UNRANKED';
        const isMasterPlus = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier);
        if (isMasterPlus) return tier;
        const rankMap = { 'I': '1', 'II': '2', 'III': '3', 'IV': '4' };
        return `${tier} ${rankMap[rank] || rank}`;
    };

    const openModal = async (player) => {
        if (player.error && !player.puuid) return;
        setSelectedPlayer(player);
        setModalLoading(true);
        try {
            const res = await fetch(`/api/match-history?name=${encodeURIComponent(player.name)}&tag=${encodeURIComponent(player.tag)}`);
            const data = await res.json();
            if (data.matchHistory) {
                setSelectedPlayer(prev => ({ ...prev, matchHistory: data.matchHistory }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setModalLoading(false);
        }
    };

    if (loading && members.length === 0) {
        return (
            <div className={styles.container} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1 className={styles.logo}>CONTROL</h1>
                <p>전적 데이터를 서버에서 가져오는 중입니다...</p>
            </div>
        );
    }

    const topMembers = members.filter(m => m.overallRank && m.overallRank <= 3).slice(0, 3);
    const sortedHero = topMembers.length >= 3 ? [topMembers[1], topMembers[0], topMembers[2]] : topMembers;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h1 className={styles.logo}>CONTROL</h1>
                        <p className={styles.subtitle}>LoL Group Ranking (Shared)</p>
                    </div>
                    <div className={styles.updateInfo}>
                        {lastUpdated && <span>최종 동기화: {lastUpdated}</span>}
                        <button
                            className={`${styles.refreshButton} ${isRefreshing ? styles.spinning : ''}`}
                            onClick={fetchAllMembers}
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? '데이터 수집 중...' : '실시간 전적 갱신'}
                        </button>
                    </div>
                </div>
                {isRefreshing && (
                    <div className={styles.loadingBarContainer}>
                        <div className={styles.progressBarBg}>
                            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
                        </div>
                        <p className={styles.progressText}>
                            {currentLoadingName} 갱신 중... ({progress}%)
                        </p>
                    </div>
                )}
            </header>

            {sortedHero.length > 0 && (
                <section className={styles.heroSection}>
                    {sortedHero.map((player) => (
                        <div key={player.name + player.tag} className={`${styles.rankCard} ${styles[`rank${player.overallRank}`]} ${styles.clickableRow}`} onClick={() => openModal(player)}>
                            <span className={styles.rankBadge}>RANK {player.overallRank}</span>
                            <div className={styles.playerAvatar}><img src={player.profileIcon || 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/profileicon/0.png'} alt="" className={styles.avatarImg} /></div>
                            <h2 className={styles.playerName}>{player.name}</h2>
                            <p className={styles.playerTier}>{getDisplayTier(player.tier, player.rank)}</p>
                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}><span className={styles.statLabel}>Win Rate</span><span className={styles.statValue}>{player.winRate || 0}%</span></div>
                                <div className={styles.statItem}><span className={styles.statLabel}>LP</span><span className={styles.statValue}>{player.lp || 0} LP</span></div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            <section className={styles.rankingTableSection}>
                <table className={styles.table}>
                    <thead><tr><th>Rank</th><th>Player</th><th>Tier</th><th>Win Rate</th><th>LP</th></tr></thead>
                    <tbody>
                        {members.map((player) => (
                            <tr key={player.name + player.tag} className={`${styles.tableRow} ${styles.clickableRow} ${player.error && !player.tier ? styles.errorRow : ''}`} onClick={() => openModal(player)}>
                                <td className={styles.rankNumber}>{player.overallRank ? `#${player.overallRank}` : '-'}</td>
                                <td className={styles.playerName}>
                                    <div className={styles.cellWithIcon}>
                                        <img src={player.profileIcon || 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/profileicon/0.png'} alt="" className={styles.tinyIcon} />
                                        <span>{player.name} <small>#{player.tag}</small></span>
                                    </div>
                                </td>
                                <td>{player.error && !player.tier ? '조회 실패' : getDisplayTier(player.tier, player.rank)}</td>
                                <td>{player.error && !player.tier ? '-' : `${player.winRate || 0}%`}</td>
                                <td>{player.error && !player.tier ? '-' : `${player.lp || 0} LP`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {selectedPlayer && (
                <div className={styles.modalOverlay} onClick={() => setSelectedPlayer(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <img src={selectedPlayer.profileIcon || 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/profileicon/0.png'} alt="" className={styles.modalAvatar} />
                            <div>
                                <h2 className={styles.modalTitle}>{selectedPlayer.name}</h2>
                                <p>{getDisplayTier(selectedPlayer.tier, selectedPlayer.rank)} {selectedPlayer.lp || 0} LP</p>
                            </div>
                            <button className={styles.closeButton} onClick={() => setSelectedPlayer(null)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p className={styles.historyTitle}>최근 경기 결과</p>
                            {modalLoading ? <div className={styles.modalLoader}>데이터 분석 중...</div> : (
                                <div className={styles.matchList}>
                                    {selectedPlayer.matchHistory && selectedPlayer.matchHistory.length > 0 ? (
                                        selectedPlayer.matchHistory.map(m => (
                                            <div key={m.id} className={`${styles.matchItem} ${m.win ? styles.win : styles.lose}`}>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${m.champion}.png`} alt="" className={styles.matchChampionImg} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 'bold' }}>{m.win ? '승리' : '패배'}</div>
                                                    <small style={{ opacity: 0.7 }}>{m.date}</small>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '0.9rem' }}>{m.kda}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.noData}>최근 랭크 게임 기록을 찾을 수 없습니다.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
