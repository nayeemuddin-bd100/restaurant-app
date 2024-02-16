"use client";

import { useEffect } from "react";

interface ErrorStateProps {
	error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-red-500">Oops!</h1>
				<p className="mt-4 text-xl text-gray-600">Something went wrong.</p>
			</div>
		</div>
	);
};

export default ErrorState;
