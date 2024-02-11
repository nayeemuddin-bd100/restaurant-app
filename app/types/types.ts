export type MenuType = {
	id: string;
	title: string;
	desc: string;
	color: string;
	img: string;
}[];

export type ProductType = {
	id: string;
	title: string;
	desc: string;
	img?: string;
	price: number;
	options?: {
		title: string;
		additionalPrice: number;
	}[];
};

export type OrderType = {
	id: string;
	price: number;
	products: CartItemType[];
	status: string;
	intent_id?: string;
	userEmail: string;
	createdAt: Date;
};

export type CartItemType = {
	id: string;
	title: string;
	img?: string;
	price: number;
	optionTitle?: string;
	quantity: number;
};

export type CartType = {
	products: CartItemType[];
	totalItems: number;
	totalPrice: number;
};
export type ActionType = {
	addToCart: (item: CartItemType) => void;
	removeFromCart: (item: CartItemType) => void;
	resetCart: () => void;
};
