import { CartItemType } from "../types/types";

interface IParams {
	price: number;
	status: string;
	products: CartItemType[];
}
const completeOrder = async (products: IParams) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(products),
	});
	return await res.json();
};

export default completeOrder;
