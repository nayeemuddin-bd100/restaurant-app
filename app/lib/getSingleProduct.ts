const getSingleProducts = async (id: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
			{
				cache: "force-cache",
			}
		);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return await res.json();
	} catch (error) {
		console.log(error);
	}
};

export default getSingleProducts;
