import Product from "../components/Product";
import getProducts from "../lib/getProducts";
import { ProductType } from "../types/types";

const AllItemsPage = async () => {
	const products: ProductType[] = await getProducts({});

	if (products?.length === 0) {
		return (
			<h2 className="text-3xl text-red-400 w-screen mt-10 font-semibold text-center mx-auto">
				Product Not Found
			</h2>
		);
	}

	return (
		<div className="flex flex-row flex-wrap  text-red-500">
			{products?.map((item) => (
				<Product key={item.id} item={item} />
			))}
		</div>
	);
};

export default AllItemsPage;
