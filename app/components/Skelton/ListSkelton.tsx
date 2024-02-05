const ListSkelton = () => {
	// dark:divide-red-700 md:p-6 dark:border-red-700 border-red-200 divide-y divide-red-200
	return (
		<div
			role="status"
			className="w-[80%] mx-auto p-4 space-y-4  animate-pulse mt-10"
		>
			<div className="flex items-center justify-between">
				<div>
					<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-600 w-24 mb-2.5"></div>
					<div className="w-32 h-2 bg-red-200 rounded-full dark:bg-red-700"></div>
				</div>
				<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-700 w-12"></div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<div>
					<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-600 w-24 mb-2.5"></div>
					<div className="w-32 h-2 bg-red-200 rounded-full dark:bg-red-700"></div>
				</div>
				<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-700 w-12"></div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<div>
					<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-600 w-24 mb-2.5"></div>
					<div className="w-32 h-2 bg-red-200 rounded-full dark:bg-red-700"></div>
				</div>
				<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-700 w-12"></div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<div>
					<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-600 w-24 mb-2.5"></div>
					<div className="w-32 h-2 bg-red-200 rounded-full dark:bg-red-700"></div>
				</div>
				<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-700 w-12"></div>
			</div>
			<div className="flex items-center justify-between pt-4">
				<div>
					<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-600 w-24 mb-2.5"></div>
					<div className="w-32 h-2 bg-red-200 rounded-full dark:bg-red-700"></div>
				</div>
				<div className="h-2.5 bg-red-300 rounded-full dark:bg-red-700 w-12"></div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default ListSkelton;
