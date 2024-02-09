const getSingleProducts = async (id: string) => {
	try {
		const res = await fetch(`http://localhost:3000/api/products/${id}`, {
			cache: "no-cache",
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
