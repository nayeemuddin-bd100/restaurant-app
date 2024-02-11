"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddProductSkelton from "../components/Skelton/AddProductSkelton";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

type Inputs = {
	title: string;
	desc: string;
	price: number;
	catSlug: string;
	img: string;
};

type Option = {
	title: string;
	additionalPrice: number;
};

const AddPage = () => {
	const { data: session, status } = useSession();
	const [inputs, setInputs] = useState<Inputs>({
		title: "",
		desc: "",
		price: 0,
		catSlug: "",
		img: "",
	});

	const [option, setOption] = useState<Option>({
		title: "",
		additionalPrice: 0,
	});

	const [options, setOptions] = useState<Option[]>([]);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	if (status === "loading") {
		return <AddProductSkelton />;
	}

	if (status === "unauthenticated" || !session?.user.isAdmin) {
		router.push("/");
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setInputs((prev) => {
			const value =
				e.target.type === "number"
					? parseFloat(e.target.value)
					: e.target.value;

			return { ...prev, [e.target.name]: value };
		});
	};
	const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption((prev) => {
			const value =
				e.target.type === "number"
					? parseFloat(e.target.value)
					: e.target.value;

			return { ...prev, [e.target.name]: value };
		});
	};

	// Upload image
	const handleSuccess = (uploadedFile: any) => {
		setInputs((prev) => ({ ...prev, img: uploadedFile?.info?.secure_url }));
	};

	// Add new product to db
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				body: JSON.stringify({
					...inputs,
					options,
				}),
			});

			const data = await res.json();
			router.push(`/product/${data.id}`);
			setLoading(false);
			toast.success("Product created successfully");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="p-4 lg:px-20 xl:px-40  flex items-center justify-center text-red-500 w-screen">
			<form onSubmit={handleSubmit} className="flex flex-wrap gap-6 w-full">
				<h1 className="text-4xl mb-2 text-gray-300 font-bold">
					Add New Product
				</h1>

				{/* Upload Image */}
				<div className="w-full  flex flex0col gap-2 ring-1 ring-red-200 p-4">
					<CldUploadButton
						options={{ multiple: false }}
						uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
						onSuccess={handleSuccess}
						className="text-sm cursor-pointer flex gap-4 items-center"
					>
						{inputs.img && (
							<div className=" w-full h-full">
								<Image alt="Upload" width={150} height={113} src={inputs.img} />
							</div>
						)}

						<div className="w-full flex flex-row gap-4">
							<Image src="/upload.png" alt="" width={30} height={20} />
							<p>Upload Image</p>
						</div>
					</CldUploadButton>
				</div>

				<div className="w-full flex flex-col gap-2 ">
					<label className="text-sm">Title</label>
					<input
						className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
						type="text"
						placeholder="Bella Napoli"
						name="title"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label className="text-sm">Description</label>
					<textarea
						rows={3}
						className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
						placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
						name="desc"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full flex flex-col gap-2 ">
					<label className="text-sm">Price</label>
					<input
						className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
						type="number"
						placeholder="29"
						name="price"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full flex flex-col gap-2 ">
					<label className="text-sm">Category</label>
					<input
						className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
						type="text"
						placeholder="pizzas"
						name="catSlug"
						onChange={handleChange}
					/>
				</div>

				<div className="w-full flex flex-col gap-2">
					<label className="text-sm">Options</label>
					<div className="flex flex-col md:flex-row gap-2">
						<input
							className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
							type="text"
							placeholder="Title"
							name="title"
							onChange={changeOption}
						/>
						<input
							className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
							type="number"
							placeholder="Additional Price"
							name="additionalPrice"
							onChange={changeOption}
						/>
						<button
							type="button"
							className="bg-gray-500 p-2 text-white"
							onClick={() => setOptions((prev) => [...prev, option])}
						>
							Add Option
						</button>
					</div>
					<div className="flex flex-wrap gap-4 mt-2">
						{options.map((opt) => (
							<div
								key={opt.title}
								className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
								onClick={() =>
									setOptions((prev) =>
										prev.filter((item) => item.title !== opt.title)
									)
								}
							>
								<span>{opt.title}</span>
								<span className="text-xs"> (+ ${opt.additionalPrice})</span>
							</div>
						))}
					</div>
				</div>

				<button
					type="submit"
					disabled={loading === true}
					className={`bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center
				
					`}
				>
					{loading ? "Loading..." : "Submit"}
				</button>
			</form>
		</div>
	);
};

export default AddPage;
