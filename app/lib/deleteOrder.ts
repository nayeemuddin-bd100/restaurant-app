const deleteOrder = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
		{
			method: "DELETE",
		}
	);
	return await res.json();
};

export default deleteOrder;
