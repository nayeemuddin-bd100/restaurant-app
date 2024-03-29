import { create } from "zustand";
import { ActionType, CartType } from "../types/types";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
	products: [],
	totalItems: 0,
	totalPrice: 0,
};

export const useCartStore = create(
	persist<CartType & ActionType>(
		(set, get) => ({
			products: INITIAL_STATE.products,
			totalItems: INITIAL_STATE.totalItems,
			totalPrice: INITIAL_STATE.totalPrice,

			addToCart: (item) => {
				// if product exists in cart, then update quantity and price only
				const products = get().products;
				const productInState = products.find(
					(product) => product.id === item.id
				);

				if (productInState) {
					const updatedProducts = products.map((product) =>
						product.id === item.id
							? {
									...product,
									quantity: item.quantity + product.quantity,
									price: item.price + product.price,
							  }
							: product
					);

					set((state) => ({
						products: updatedProducts,
						totalItems: state.totalItems + item.quantity,
						totalPrice: state.totalPrice + item.price,
					}));
				} else {
					set((state) => ({
						products: [...state.products, item],
						totalItems: state.totalItems + item.quantity,
						totalPrice: state.totalPrice + item.price,
					}));
				}
			},

			removeFromCart: (item) => {
				set((state) => ({
					products: state.products.filter((product) => product.id !== item.id),
					totalItems: state.totalItems - item.quantity,
					totalPrice: state.totalPrice - item.price,
				}));
			},

			resetCart: () => set(INITIAL_STATE),
		}),
		{ name: "cart", skipHydration: true }
	)
);
