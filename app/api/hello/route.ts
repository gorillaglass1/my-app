import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({name : "Hello Next.JS"});
    
}   

export async function POST(name:string) {
    return NextResponse.json({name : name}).status;
}