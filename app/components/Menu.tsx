"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const links = [
	{ id: 1, title: "Home", url: "/" },
	{ id: 2, title: "Menu", url: "/menu" },
	{ id: 3, title: "All Items", url: "/all-items" },
];

const Menu = () => {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();
	const handleLogOut = async () => {
		await signOut();
		toast.success("Logged out successfully");
		setOpen(false);
	};
	return (
		<div>
			<Image
				src={open ? "/close.png" : "/open.png"}
				alt=""
				width={20}
				height={20}
				onClick={() => setOpen(!open)}
				className="cursor-pointer"
			/>
			{open && (
				<div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
					{links.map((item) => (
						<Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
							{item.title}
						</Link>
					))}

					{session?.user?.isAdmin && (
						<div>
							<Link onClick={() => setOpen(false)} href="/orders">
								Orders
							</Link>
						</div>
					)}
					{session?.user?.isAdmin && (
						<div>
							<Link onClick={() => setOpen(false)} href="/add-product">
								Add Products
							</Link>
						</div>
					)}

					{!session && (
						<Link href={"/login"} onClick={() => setOpen(false)}>
							Login
						</Link>
					)}

					{session?.user.email && (
						<button className="uppercase" onClick={handleLogOut}>
							Logout
						</button>
					)}
					<Link href="/cart" onClick={() => setOpen(false)}>
						<CartIcon />
					</Link>
				</div>
			)}
		</div>
	);
};

export default Menu;
