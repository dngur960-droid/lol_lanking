import { NextResponse } from 'next/server';
import { getSummonerData } from '../../../lib/riot';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const tag = searchParams.get('tag') || 'KR1';

    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const data = await getSummonerData(name, tag);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
