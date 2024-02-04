import { NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

export const GET = async () => {
	try {
		const categories = await prisma?.category.findMany();
		return NextResponse.json(categories);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: "Internal Server Error" }),
			{ status: 500 }
		);
	}
};
