const deleteOrder = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
		method: "DELETE",
	});
	return res.json();
};

export default deleteOrder;
