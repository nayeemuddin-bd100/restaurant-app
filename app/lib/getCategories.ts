const getCategories = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
		{
			cache: "force-cache",
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};

export default getCategories;
