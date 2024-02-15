const deleteOrder = async (id: string) => {
	const res = await fetch(`${process.env.BASE_URL}/api/orders/${id}`, {
		method: "DELETE",
	});
	return res.json();
};

export default deleteOrder;
