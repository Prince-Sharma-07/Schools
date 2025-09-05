import prismaClient from "@/lib/services/prisma";
import schoolSchema from "@/lib/validation/schoolSchema";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import z from "zod";

const serverSchoolSchema = schoolSchema.extend({
  image: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email_id = formData.get("email_id") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const image = formData.get("image") as File | null;

    // save image
    let imagePath: string | undefined;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(
        process.cwd(),
        "public",
        "schoolImages",
        filename
      );
      await writeFile(filepath, buffer);
      imagePath = `/schoolImages/${filename}`;
    }

    const parsed = serverSchoolSchema.safeParse({
      name,
      email_id,
      address,
      city,
      state,
      contact,
      image: imagePath,
    });

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      return NextResponse.json(
        {
          success: false,
          errors: tree,
        },
        { status: 400 }
      );
    }

    const school = await prismaClient.school.create({
      data: parsed.data,
    });
    if (school) {
      return NextResponse.json({
        success: true,
        data: school,
        message: "School added successfully!",
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
