// app/api/member/route.ts
import { NextResponse } from "next/server";
import { memberServiceImpl } from "@/lib/services/memberServiceImpl";
import { MemoryMemberRepository } from "@/lib/repositories/memoryMemberRepository";

// 실제 환경에서는 싱글톤 인스턴스를 사용하거나 DI 컨테이너를 고려할 수 있습니다.
const repo = new MemoryMemberRepository();
const service = new memberServiceImpl(repo);

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const member = await service.join(body);
        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ error: "가입 실패" }, { status: 400 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = Number(id);

    if (!userId) return NextResponse.json({ error: "ID 누락" }, { status: 400 });

    try {
        const member = await service.findOne(userId);
        return NextResponse.json(member);
    } catch (e) {
        return NextResponse.json({ error: "찾을 수 없음" }, { status: 404 });
    }
}