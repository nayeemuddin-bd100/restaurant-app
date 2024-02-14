const LoginSkelton = () => {
	return (
		<div className="p-4 flex items-center justify-center h-full animate-pulse">
			<div className="h-full shadow-2xl rounded-md flex items-center flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
				<div className="w-full md:w-1/2 relative h-64 bg-red-200"></div>
				<div className="p-10 flex flex-col gap-8 md:w-1/2">
					<div className="h-6 bg-red-200 rounded w-1/4"></div>
					<div className="h-8 bg-red-200 rounded w-full"></div>

					<div>
						<div>
							<form className="w-full mx-auto flex flex-wrap justify-center">
								<div className="relative z-0 w-full mb-5 group h-10 bg-red-200"></div>
								<div className="relative z-0 w-full mb-5 group h-10 bg-red-200"></div>
								<div className="h-10 bg-red-200 rounded w-2/4 "></div>
							</form>
						</div>
					</div>

					<div className="h-8 bg-red-200 rounded w-full"></div>
				</div>
			</div>
		</div>
	);
};

export default LoginSkelton;
