import prismaClient from "@/lib/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schools = await prismaClient.school.findMany();
    if (schools.length) {
      return NextResponse.json({
        success: true,
        data: schools,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went Wrong on server!",
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
