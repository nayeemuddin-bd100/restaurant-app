const getOrders = async () => {
	const res = await fetch("http://localhost:3000/api/orders", {
		cache: "force-cache",
	});

	return res.json();
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
};

export default getOrders;
