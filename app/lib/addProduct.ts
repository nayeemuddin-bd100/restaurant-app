interface IParams {
	title: string;
	desc: string;
	img?: string;
	price: number;
	options?: {
		title: string;
		additionalPrice: number;
	}[];
}
const addProduct = async (product: IParams) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
		method: "POST",
		body: JSON.stringify(product),
	});
	return await res.json();
};

export default addProduct;
