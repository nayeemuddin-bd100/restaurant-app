const AddProductSkelton = () => {
	return (
		<div className="p-4 lg:px-20 xl:px-40 flex items-center justify-center text-red-500 w-screen">
			<form className="flex flex-wrap gap-6 w-full">
				<h1 className="text-4xl mb-2 text-gray-300 font-bold">
					<div className="h-8 bg-gray-300 w-64 animate-pulse"></div>
				</h1>
				<div className="w-full flex flex-col gap-2">
					<label
						className="text-sm cursor-pointer flex gap-4 items-center"
						htmlFor="file"
					>
						<div className="h-6 bg-gray-300 w-24 animate-pulse"></div>
						<span>
							<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
						</span>
					</label>
					<div className="h-6 bg-gray-300 w-full animate-pulse"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label
						className="text-sm cursor-pointer flex gap-4 items-center"
						htmlFor="file"
					>
						<div className="h-6 bg-gray-300 w-24 animate-pulse"></div>
						<span>
							<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
						</span>
					</label>
					<div className="h-6 bg-gray-300 w-full animate-pulse"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label
						className="text-sm cursor-pointer flex gap-4 items-center"
						htmlFor="file"
					>
						<div className="h-6 bg-gray-300 w-24 animate-pulse"></div>
						<span>
							<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
						</span>
					</label>
					<div className="h-6 bg-gray-300 w-full animate-pulse"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label
						className="text-sm cursor-pointer flex gap-4 items-center"
						htmlFor="file"
					>
						<div className="h-6 bg-gray-300 w-24 animate-pulse"></div>
						<span>
							<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
						</span>
					</label>
					<div className="h-6 bg-gray-300 w-full animate-pulse"></div>
				</div>
				{/* ... (similar modifications for other form fields) */}
				<button
					type="submit"
					className="bg-red-200 p-4 text-white w-48 rounded-md relative h-8 flex items-center justify-center"
				>
					<div className="h-3 bg-gray-300 w-24 animate-pulse"></div>
				</button>
			</form>
		</div>
	);
};

export default AddProductSkelton;
