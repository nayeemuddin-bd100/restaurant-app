"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { OrderType } from "../types/types";
import ListSkelton from "../components/Skelton/ListSkelton";
import Image from "next/image";

const OrdersPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	if (status === "unauthenticated") {
		router.push("/");
	}

	const { isLoading, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			fetch("http://localhost:3000/api/orders").then((res) => res.json()),
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();

		console.log(id);
	};

	if (isLoading || status === "loading") return <ListSkelton />;

	return (
		<div className="p-4 lg:px-20 xl:px-40">
			{data.length > 0 ? (
				<table className="w-full border-separate border-spacing-3 ">
					<thead>
						<tr className="text-left">
							<th className="hidden md:block">Order ID</th>
							<th>Date</th>
							<th>Price</th>
							<th className="hidden md:block">Products</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: OrderType) => (
							<tr className="bg-red-100" key={item.id}>
								<td className="hidden md:block py-6 px-1">{item.id}</td>
								<td className="py-6 px-1">
									{item.createdAt.toString().slice(0, 10)}
								</td>
								<td className="py-6 px-1">{item.price}</td>
								<td className="hidden md:block py-6 px-1">
									{item.products[0].title}
								</td>
								{session?.user.isAdmin ? (
									<td>
										<form
											className="flex items-center justify-center gap-4"
											onSubmit={(e) => handleUpdate(e, item.id)}
										>
											<input
												placeholder={item.status}
												className="p-2 ring-1 ring-red-100 rounded-md"
											/>
											<button className="bg-red-400 p-2 rounded-full">
												<Image src="/edit.png" alt="" width={20} height={20} />
											</button>
										</form>
									</td>
								) : (
									<td className="py-6 px-1">{item.status}</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<h1 className="text-3xl text-red-500 text-center mt-10 text-bold ">
					No orders yet
				</h1>
			)}
		</div>
	);
};

export default OrdersPage;
