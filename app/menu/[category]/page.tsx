import Image from "next/image";
import Link from "next/link";
import getProducts from "../../lib/getProducts";
import { ProductType } from "@/app/types/types";

interface CategoryProps {
	params: { category: string };
}
const CategoryPage = async ({ params }: CategoryProps) => {
	const category = params?.category;
	const products: ProductType[] = await getProducts(category);

	if (products.length === 0) {
		return (
			<h2 className="text-3xl text-red-400 w-screen mt-10 font-semibold text-center mx-auto">
				Product Not Found
			</h2>
		);
	}

	return (
		<div className="flex flex-row flex-wrap  text-red-500">
			{products.map((item) => (
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
						<button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
							{" "}
							Add to Cart
						</button>
					</div>
				</Link>
			))}
		</div>
	);
};

export default CategoryPage;
