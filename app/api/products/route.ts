import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

export const GET = async (req: NextRequest) => {
	const { searchParams } = req.nextUrl;
	const category = searchParams.get("category");
	const isFeatured = searchParams.get("isFeatured");

	try {
		const products = await prisma?.product.findMany({
			where: {
				...(category
					? { catSlug: category }
					: isFeatured === "true"
					? { isFeatured: true }
					: {}),
			},
		});

		// console.log(products);

		return new NextResponse(JSON.stringify(products), { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: "Internal Server Error" }),
			{ status: 500 }
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		const product = await prisma.product.create({
			data: body,
		});
		return new NextResponse(JSON.stringify(product), { status: 201 });
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong!" }),
			{ status: 500 }
		);
	}
};
