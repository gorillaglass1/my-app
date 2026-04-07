// app/api/tourSpot/route.ts
import { NextResponse } from "next/server";
import { tourSpotServiceImpl } from "@/lib/services/tourSpotServiceImpl";
import { MemoryTourSpotRepository } from "@/lib/repositories/memoryTourSpotImpl";

// 실제 서비스 개발 시에는 싱글톤 및 DI 컨테이너로 관리해야 합니다.
const repo = new MemoryTourSpotRepository();
const service = new tourSpotServiceImpl(repo);

/**
 * POST /api/tourSpot
 * Body: { spotId, name, area, address, longitude, latitude, ... }
 * 관광지 등록
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.spotId || !body.name || !body.area || !body.address) {
            return NextResponse.json(
                { error: "spotId, name, area, address 는 필수 항목입니다." },
                { status: 400 }
            );
        }

        const spot = await service.register(body);
        return NextResponse.json(spot, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "관광지 등록 실패";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

/**
 * GET /api/tourSpot
 * Query: ?id=xxx          → 특정 ID 조회
 *        ?area=xxx        → 지역별 조회
 *        ?name=xxx        → 이름 검색 (부분 일치)
 *        (파라미터 없음)  → 전체 조회
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const area = searchParams.get("area");
    const name = searchParams.get("name");

    try {
        if (id) {
            const spot = await service.findById(id);
            return NextResponse.json(spot);
        }

        if (area) {
            const spots = await service.findByArea(area);
            return NextResponse.json(spots);
        }

        if (name) {
            const spots = await service.findByName(name);
            return NextResponse.json(spots);
        }

        const spots = await service.findAll();
        return NextResponse.json(spots);
    } catch (error) {
        const message = error instanceof Error ? error.message : "조회 실패";
        return NextResponse.json({ error: message }, { status: 404 });
    }
}

/**
 * DELETE /api/tourSpot
 * Query: ?id=xxx
 * 관광지 삭제
 */
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "id 파라미터가 필요합니다." }, { status: 400 });
    }

    try {
        await service.remove(id);
        return NextResponse.json({ message: `ID(${id}) 관광지가 삭제되었습니다.` });
    } catch (error) {
        const message = error instanceof Error ? error.message : "삭제 실패";
        return NextResponse.json({ error: message }, { status: 404 });
    }
}
