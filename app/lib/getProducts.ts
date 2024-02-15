const getProducts = async (params: {
	category?: string;
	isFeatured?: string;
}) => {
	let url;
	if (params?.category) {
		url = `${process.env.BASE_URL}/api/products?category=${params.category}`;
	} else if (params?.isFeatured) {
		url = `${process.env.BASE_URL}/api/products?isFeatured=true`;
	} else {
		url = `${process.env.BASE_URL}/api/products`;
	}
	try {
		const res = await fetch(url, {
			cache: "force-cache",
			next: { revalidate: 3 },
		});

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default getProducts;
