import { NextResponse } from 'next/server';
import { getSummonerData } from '../../../lib/riot';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const tag = searchParams.get('tag');

    if (!name || !tag) {
        return NextResponse.json({ error: 'Name and Tag are required' }, { status: 400 });
    }

    try {
        // includeMatches = true로 설정하여 전적 데이터만 다시 가져옴
        const data = await getSummonerData(name, tag, true);
        return NextResponse.json({ matchHistory: data.matchHistory });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
