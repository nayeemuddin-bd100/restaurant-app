import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

interface IParams {
	id: string;
}
export const GET = async (
	req: NextRequest,
	{ params }: { params: IParams }
) => {
	try {
		const product = await prisma?.product.findUnique({
			where: { id: params?.id },
		});
		return NextResponse.json(product);
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: "Internal Server Error" }),
			{ status: 500 }
		);
	}
};
