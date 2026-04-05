import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "UNKNOWN NAME";
    return NextResponse.json({name: name, time: Date.now().toLocaleString, university: "Kanwon Univ.", tellNumber: "033-250-6114"})
}