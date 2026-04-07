// app/api/member/route.ts
import { NextResponse } from "next/server";
import { memberServiceImpl } from "@/lib/services/memberServiceImpl";
import { MemoryMemberRepository } from "@/lib/repositories/memoryMemberRepository";

const repo = new MemoryMemberRepository(); // 실제 서비스 개발시에는  싱글톤 및 appCinfig 의존성 관리 해야함
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

    if (userId == null)
        return NextResponse.json({ error: "ID 누락" }, { status: 400 });
    try {
        const member = await service.findOne(userId);
        return NextResponse.json(member);
    } catch (e) {
        return NextResponse.json({ error: "찾을 수 없음" }, { status: 404 });
    }
}