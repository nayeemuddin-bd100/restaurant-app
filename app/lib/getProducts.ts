const getProducts = async (params: {
	category?: string;
	isFeatured?: string;
}) => {
	let url;
	if (params?.category) {
		url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${params.category}`;
	} else if (params?.isFeatured) {
		url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?isFeatured=true`;
	} else {
		url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;
	}
	try {
		const res = await fetch(url, {
			cache: "no-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return await res.json();
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

export default getProducts;
