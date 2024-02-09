const ListSkelton = () => {
	return (
		<div className="p-4 lg:px-20 xl:px-40">
			<table className="w-full border-separate border-spacing-3">
				<thead>
					<tr className="text-left">
						<th className="hidden md:block">
							<div className="h-5 bg-gray-300 w-24 animate-pulse"></div>
						</th>
						<th>
							<div className="h-5 bg-gray-300 w-16 animate-pulse"></div>
						</th>
						<th>
							<div className="h-5 bg-gray-300 w-12 animate-pulse"></div>
						</th>
						<th className="hidden md:block">
							<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
						</th>
						<th>
							<div className="h-5 bg-gray-300 w-12 animate-pulse"></div>
						</th>
					</tr>
				</thead>
				<tbody>
					{[...Array(4)].map((_, index) => (
						<tr className="bg-red-100" key={index}>
							<td className="hidden md:block py-6 px-1">
								<div className="h-5 bg-gray-300 w-24 animate-pulse"></div>
							</td>
							<td className="py-6 px-1">
								<div className="h-5 bg-gray-300 w-16 animate-pulse"></div>
							</td>
							<td className="py-6 px-1">
								<div className="h-5 bg-gray-300 w-12 animate-pulse"></div>
							</td>
							<td className="hidden md:block py-6 px-1">
								<div className="h-5 bg-gray-300 w-32 animate-pulse"></div>
							</td>
							<td>
								<div className="h-5 bg-gray-300 w-12 animate-pulse"></div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListSkelton;
