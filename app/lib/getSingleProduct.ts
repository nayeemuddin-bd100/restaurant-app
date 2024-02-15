const getSingleProducts = async (id: string) => {
	try {
		const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
			cache: "force-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default getSingleProducts;
