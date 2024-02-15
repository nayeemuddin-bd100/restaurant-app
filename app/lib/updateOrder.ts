const updateOrders = async (updateOrders: { id: string; status: string }) => {
	const res = await fetch(
		`${process.env.BASE_URL}/api/orders/${updateOrders.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateOrders.status),
		}
	);
	return res.json();
};

export default updateOrders;
