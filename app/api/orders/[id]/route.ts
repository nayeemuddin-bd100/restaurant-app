import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";
import { getAuthSession } from "@/app/utils/auth";

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	const session = await getAuthSession();

	try {
		const body = await req.json();

		//User Validation
		if (!id || typeof id !== "string") {
			return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
		}
		if (!session || !session.user.isAdmin) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const updatedOrder = await prisma.order.update({
			where: {
				id,
			},
			data: { status: body },
		});

		return NextResponse.json(updatedOrder, { status: 200 });
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ message: "Something Went wrong" },
			{
				status: 500,
			}
		);
	}
};
