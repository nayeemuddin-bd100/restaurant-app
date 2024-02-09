import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";
import { getAuthSession } from "@/app/utils/auth";

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

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: IParams }
) => {
	const { id } = params;
	const session = await getAuthSession();

	if (session?.user.isAdmin) {
		try {
			await prisma.product.delete({
				where: {
					id: id,
				},
			});

			return new NextResponse(JSON.stringify("Product has been deleted!"), {
				status: 200,
			});
		} catch (err) {
			console.log(err);
			return new NextResponse(
				JSON.stringify({ message: "Something went wrong!" }),
				{ status: 500 }
			);
		}
	}
	return new NextResponse(JSON.stringify({ message: "You are not allowed!" }), {
		status: 403,
	});
};
