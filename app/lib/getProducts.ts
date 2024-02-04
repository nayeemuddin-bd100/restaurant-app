const getProducts = async (category?: string) => {
	const res = await fetch(
		`http://localhost:3000/api/products${
			category ? `?category=${category}` : ""
		}`,
		{
			cache: "force-cache",
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};

export default getProducts;
