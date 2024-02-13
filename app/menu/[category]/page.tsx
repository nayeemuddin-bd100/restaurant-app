import Image from "next/image";
import Link from "next/link";
import getProducts from "../../lib/getProducts";
import { ProductType } from "@/app/types/types";
import Product from "@/app/components/Product";

interface CategoryProps {
	params: { category: string };
}
const CategoryPage = async ({ params }: CategoryProps) => {
	const products: ProductType[] = await getProducts(params);

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
				<Product key={item.id} item={item} />
			))}
		</div>
	);
};

export default CategoryPage;
