"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const UserLink = () => {
	const { data: session, status } = useSession();
	const handleLogOut = async () => {
		await signOut();
		toast.success("Logged out successfully");
	};

	return (
		<div>
			{status === "authenticated" ? (
				<div className=" flex items-center gap-4">
					{session?.user?.isAdmin && (
						<div>
							<Link href="/orders">Orders</Link>
						</div>
					)}
					{session?.user?.isAdmin && (
						<div>
							<Link href="/add-product">Add</Link>
						</div>
					)}
					<div className="ml-4 cursor-pointer " onClick={handleLogOut}>
						Logout
					</div>
				</div>
			) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	);
};

export default UserLink;
