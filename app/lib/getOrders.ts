const getOrders = async () => {
	const res = await fetch("http://localhost:3000/api/orders");
	return res.json();
};

export default getOrders;
