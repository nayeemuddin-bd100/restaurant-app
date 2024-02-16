const updateOrders = async (updateOrders: { id: string; status: string }) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${updateOrders.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateOrders.status),
		}
	);
	return await res.json();
};

export default updateOrders;
