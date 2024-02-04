const getCategories = async () => {
	const res = await fetch("http://localhost:3000/api/categories", {
		cache: "force-cache",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};

export default getCategories;
