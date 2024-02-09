import DeleteButton from "@/app/components/DeleteButton";
import Price from "@/app/components/Price";
import getSingleProducts from "@/app/lib/getSingleProduct";
import Image from "next/image";

interface IParams {
	id: string;
}
const SingleProductPage = async ({ params }: { params: IParams }) => {
	const singleProduct = await getSingleProducts(params.id);

	if (!singleProduct) {
		return (
			<h2 className="text-3xl text-red-400 w-screen mt-10 font-semibold text-center mx-auto">
				Product Not Found
			</h2>
		);
	}

	return (
		<div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
			{/* IMAGE CONTAINER */}
			{singleProduct?.img && (
				<div className="relative w-full h-1/2 md:h-[70%]">
					<Image
						src={singleProduct?.img}
						alt=""
						className="object-contain w-10"
						fill
					/>
				</div>
			)}
			{/* TEXT CONTAINER */}
			<div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
				<h1 className="text-3xl font-bold uppercase xl:text-5xl">
					{singleProduct?.title}
				</h1>
				<DeleteButton id={singleProduct.id} />
				<p>{singleProduct?.desc}</p>
				<Price product={singleProduct} />
			</div>
		</div>
	);
};

export default SingleProductPage;
