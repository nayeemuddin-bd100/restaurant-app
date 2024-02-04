import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

export const GET = async (req: NextRequest) => {
	const { searchParams } = req.nextUrl;
	const category = searchParams.get("category");

	try {
		const products = await prisma?.product.findMany({
			where: {
				...(category ? { catSlug: category } : { isFeatured: true }),
			},
		});

		return new NextResponse(JSON.stringify(products), { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: "Internal Server Error" }),
			{ status: 500 }
		);
	}
};
