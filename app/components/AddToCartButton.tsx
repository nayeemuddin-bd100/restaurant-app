"use client";

import { ProductType } from "../types/types";
import { useCartStore } from "../utils/store";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
	baseOne?: boolean;
	baseTwo?: boolean;
	baseThree?: boolean;
	product: ProductType;
	total: number;
	quantity?: number;
	selected?: number;
}
const AddToCartButton = ({
	baseOne,
	baseTwo,
	baseThree,
	product,
	total,
	quantity = 1,
	selected = 0,
}: AddToCartButtonProps) => {
	const { addToCart } = useCartStore();

	const handleCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		const item: any = {
			id: product.id,
			title: product.title,
			img: product.img,
			price: total,
			...(product.options?.length && {
				optionTitle: product.options[selected].title,
			}),
			quantity: quantity,
		};
		addToCart(item);
		toast.success("Added to cart");
	};

	return (
		<button
			className={`
    ${baseOne && " p-2 rounded-md"}
    ${baseTwo && " w-56 p-3 ring-1 ring-red-500"}
    ${baseThree && "hidden group-hover:block p-2 rounded-md"}
    bg-red-500 text-white  uppercase
    `}
			onClick={(e) => handleCart(e)}
		>
			Add to Cart
		</button>
	);
};

export default AddToCartButton;
