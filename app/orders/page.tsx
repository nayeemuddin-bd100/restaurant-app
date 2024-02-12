"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { OrderType } from "../types/types";
import Image from "next/image";
import getOrders from "../lib/getOrders";
import updateOrders from "../lib/updateOrder";
import toast from "react-hot-toast";
import OrderSkelton from "../components/Skelton/OrderSkelton";

const OrdersPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const queryClient = useQueryClient();

	if (status === "unauthenticated") {
		router.push("/");
	}

	const { isLoading, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

	const updateStatusMutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) =>
			updateOrders({ id, status }),

		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const input = form.elements[0] as HTMLInputElement;
		const status = input.value;

		updateStatusMutation.mutate({ id, status });
		toast.success("Status updated successfully");
	};
	if (isLoading || status === "loading" || updateStatusMutation.isPending)
		return <OrderSkelton />;

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
							<tr
								className={
									item?.status === "Preparing"
										? `bg-blue-100`
										: item?.status === "Ready for Pickup"
										? `bg-green-100`
										: item?.status === "On the Way"
										? `bg-yellow-100`
										: item?.status === "Delivered"
										? `bg-green-200`
										: item?.status === "Cancelled"
										? `bg-red-300`
										: `bg-red-100`
								}
								key={item.id}
							>
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
											<select
												id="select_order"
												className="block w-full p-2 ring-1 ring-red-100 rounded-md relative"
											>
												<option selected={item.status === "Preparing"}>
													Preparing
												</option>
												<option selected={item.status === "Ready for Pickup"}>
													Ready for Pickup
												</option>
												<option selected={item.status === "On the Way"}>
													On the Way
												</option>
												<option selected={item.status === "Delivered"}>
													Delivered
												</option>
												<option selected={item.status === "Cancelled"}>
													Cancelled
												</option>
											</select>
											<button
												className="bg-red-400 p-2 rounded-full"
												type="submit"
											>
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
