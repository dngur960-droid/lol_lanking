import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const RANKING_KEY = 'control_lol_ranking';
const UPDATED_AT_KEY = 'control_lol_updated_at';

export async function GET() {
    try {
        const data = await kv.get(RANKING_KEY);
        const updatedAt = await kv.get(UPDATED_AT_KEY);

        return NextResponse.json({
            members: data || [],
            lastUpdated: updatedAt || null
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { members, lastUpdated } = await request.json();

        // 데이터 저장
        await kv.set(RANKING_KEY, members);
        await kv.set(UPDATED_AT_KEY, lastUpdated);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
