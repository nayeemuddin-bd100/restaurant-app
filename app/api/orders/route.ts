import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";
import { getAuthSession } from "@/app/utils/auth";

export const GET = async () => {
	const session = await getAuthSession();

	if (session?.user.isAdmin) {
		try {
			const orders = await prisma?.order.findMany();
			return NextResponse.json(orders);
		} catch (error) {
			console.log(error);
			return new NextResponse(
				JSON.stringify({ message: "Internal Server Error" }),
				{ status: 500 }
			);
		}
	} else {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}
};

export const POST = async (req: NextRequest) => {
	const session = await getAuthSession();

	if (session) {
		try {
			const body = await req.json();
			const orders = await prisma.order.create({
				data: { ...body, userEmail: session.user.email },
			});
			return NextResponse.json(orders);
		} catch (error) {
			console.log(error);
			return new NextResponse(
				JSON.stringify({ message: "Internal Server Error" }),
				{ status: 500 }
			);
		}
	} else {
		return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}
};
