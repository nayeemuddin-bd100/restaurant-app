import Link from "next/link";

const successPage = () => {
	return (
		<div className="bg-gray-100 h-[50vh] flex items-center justify-center">
			<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
				<div className="text-4xl mb-4">🎉</div>
				<h1 className="text-2xl text-gray-800 mb-2">Order Successful</h1>
				<p className="text-gray-600 mb-6">Thank you for your purchase!</p>
				<Link
					href={"/all-items"}
					className="bg-red-500 text-white px-4 py-2 rounded-full transition hover:bg-red-600"
				>
					Continue Shopping
				</Link>
			</div>
		</div>
	);
};

export default successPage;
