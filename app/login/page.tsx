"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
	const { status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Loading ...</p>;
	}

	if (status === "authenticated") {
		router.push("/");
	}
	return (
		<div className="p-4 flex items-center justify-center h-screen">
			{/* BOX */}
			<div className="  h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
				{/* IMAGE CONTAINER */}

				<div className="w-full md:w-1/2 h-full relative">
					<Image src="/loginBg.png" alt="" fill className="object-cover" />
				</div>

				{/* FORM CONTAINER */}
				<div className="p-10 flex flex-col gap-8 md:w-1/2">
					<h1 className="font-bold text-xl xl:text-3xl text-red-500">
						Welcome
					</h1>
					<p>Log into your account or create a new one using social buttons</p>
					<button
						className="flex gap-4 p-4 ring-1 ring-blue-200 rounded-md hover:bg-red-400 hover:text-white duration-300 "
						onClick={() => signIn("google")}
					>
						<Image
							src="/google.png"
							alt=""
							width={20}
							height={20}
							className="object-contain"
						/>
						<span>Sign in with Google</span>
					</button>
					<button
						className="flex gap-4 p-4 ring-1 ring-blue-200 rounded-md hover:bg-red-400 hover:text-white duration-300"
						onClick={() => signIn("github")}
					>
						<Image
							src="/github-logo.png"
							alt=""
							width={20}
							height={20}
							className="object-contain"
						/>
						<span>Sign in with Github</span>
					</button>
					<p className="text-sm">
						Have a problem?
						<Link className="underline" href="/">
							{" "}
							Contact us
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
