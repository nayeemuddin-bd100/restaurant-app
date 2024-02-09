const getProducts = async (category?: string) => {
	try {
		const res = await fetch(
			`http://localhost:3000/api/products${
				category ? `?category=${category}` : ""
			}`,
			{
				cache: "force-cache",
				next: { revalidate: 5 },
			}
		);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default getProducts;
