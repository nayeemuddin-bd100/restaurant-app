const getProducts = async (params: {
	category?: string;
	isFeatured?: string;
}) => {
	let url;
	if (params?.category) {
		url = `http://localhost:3000/api/products?category=${params.category}`;
	} else if (params?.isFeatured) {
		url = "http://localhost:3000/api/products?isFeatured=true";
	} else {
		url = "http://localhost:3000/api/products";
	}
	try {
		const res = await fetch(url, {
			cache: "force-cache",
			next: { revalidate: 5 },
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
