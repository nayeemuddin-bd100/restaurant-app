"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const UserLink = () => {
	const { status } = useSession();
	const handleLogOut = async () => {
		await signOut();
		toast.success("Logged out successfully");
	};

	return (
		<div>
			{status === "authenticated" ? (
				<div>
					<Link href="/orders">Orders</Link>
					<span className="ml-4 cursor-pointer " onClick={handleLogOut}>
						Logout
					</span>
				</div>
			) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	);
};

export default UserLink;
