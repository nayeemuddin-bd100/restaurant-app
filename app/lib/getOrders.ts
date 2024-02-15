const getOrders = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/orders`);
	return res.json();
};

export default getOrders;
