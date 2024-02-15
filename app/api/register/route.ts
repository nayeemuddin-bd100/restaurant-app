import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/utils/prismadb";

export const POST = async (req: NextRequest) => {
	try {
		const { name, email, password } = await req.json();
		const hashedPassword = await bcrypt.hash(password, 12);

		const existingUser = await prisma?.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			throw new Error("User already exists");
		} else {
			const user = await prisma?.user.create({
				data: {
					name,
					email,
					hashedPassword,
				},
			});
			return NextResponse.json(user);
		}
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message });
	}
};
