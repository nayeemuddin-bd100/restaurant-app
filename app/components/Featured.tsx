import Image from "next/image";
import getProducts from "../lib/getProducts";
import { ProductType } from "../types/types";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface FeaturedProps {
	params?: { isFeatured: string };
}
const Featured = async ({ params }: FeaturedProps) => {
	const featuredProducts: ProductType[] = await getProducts(
		params || { isFeatured: "true" }
	);
	return (
		<div className="w-screen overflow-x-scroll text-red-500">
			{/* WRAPPER */}
			<div className="w-max flex">
				{/* SINGLE ITEM */}
				{featuredProducts.map((item) => (
					<Link
						href={`/product/${item.id}`}
						key={item.id}
						className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-100 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh] group"
					>
						{/* IMAGE CONTAINER */}
						{item?.img && (
							<div className="relative flex-1 w-full group-hover:rotate-[60deg] transition-all duration-500">
								<Image src={item?.img} alt="" fill className="object-contain" />
							</div>
						)}
						{/* TEXT CONTAINER */}
						<div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
							<h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
								{item?.title}
							</h1>
							<p className="p-4 2xl:p-8">{item?.desc}</p>
							<span className="text-xl font-bold">${item?.price}</span>
							<AddToCartButton baseOne product={item} total={item?.price} />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Featured;
