import Link from "next/link";
import { ProductType } from "../types/types";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface ProductProps {
	item: ProductType;
}
const Product = ({ item }: ProductProps) => {
	return (
		<Link
			href={`/product/${item.id}`}
			key={item.id}
			className="h-[60vh] border-red-500 border flex flex-col items-center justify-around group w-full md:w-1/2 lg:w-1/3 even:bg-fuchsia-100 hover:bg-fuchsia-200 transition-all duration-300"
		>
			{/* Image Container */}

			{item.img && (
				<div className="relative w-full h-[70%]">
					<Image alt="" src={item.img} fill className="object-contain" />
				</div>
			)}
			{/* Text Container */}
			<div className="flex items-center justify-between font-bold w-[80%]">
				<h1 className="text-2xl uppercase p-2">{item.title}</h1>
				<h2 className="group-hover:hidden text-xl">${item.price}</h2>
				<AddToCartButton baseThree product={item} total={item?.price} />
			</div>
		</Link>
	);
};

export default Product;
