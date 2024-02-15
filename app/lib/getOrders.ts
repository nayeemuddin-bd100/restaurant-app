const getOrders = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
		cache: "no-store",
	});
	return res.json();
};

export default getOrders;
