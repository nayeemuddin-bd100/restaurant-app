"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddProductSkelton from "../components/Skelton/AddProductSkelton";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";
import getCategories from "../lib/getCategories";

interface Inputs {
	title: string;
	desc: string;
	price: number;
	catSlug: string;
	img: string;
}

interface Option {
	title: string;
	additionalPrice: number;
}

interface Category {
	id: string;
	title: string;
	desc: string;
	color: string;
	img?: string;
	slug: string;
}

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
	const [categories, setCategories] = useState<Category[]>([]);
	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const data = await getCategories();

			setCategories(data);
		}
		fetchData();
	}, []);

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

	// Handle Option
	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption((prev) => {
			const value =
				e.target.type === "number"
					? parseFloat(e.target.value)
					: e.target.value;

			return { ...prev, [e.target.name]: value };
		});
	};

	const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setOption({ ...option, title: e.target.value });
	};

	const handleOptionClick = () => {
		const existingOptionIndex = options.findIndex(
			(opt) => opt.title === option.title
		);

		if (existingOptionIndex !== -1) {
			setOptions((prev) => [
				...prev.slice(0, existingOptionIndex),
				option,
				...prev.slice(existingOptionIndex + 1),
			]);
		} else {
			setOptions((prev) => [...prev, option]);
		}

		setOption({
			title: "",
			additionalPrice: 0,
		});
	};

	// Handle Select category
	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setInputs({ ...inputs, catSlug: e.target.value });
	};

	// Upload image
	const handleSuccess = (uploadedFile: any) => {
		setInputs((prev) => ({ ...prev, img: uploadedFile?.info?.secure_url }));
	};

	// Add new product to db
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.title || !inputs.desc || !inputs.price || !inputs.catSlug) {
			toast.error("Please fill all the fields");
		} else {
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
						options={{ folder: "restaurant-app", multiple: false }}
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
					<label className="text-sm" htmlFor="category">
						Category
					</label>

					<select
						id="category"
						className="block w-full p-2 ring-1 ring-red-100 border-red-300 rounded-md relative focus:ring-red-300 focus:border-red-300"
						onChange={handleChangeCategory}
					>
						{categories.length > 0 &&
							categories?.map((category) => (
								<option key={category?.id}>{category.slug}</option>
							))}
					</select>
				</div>

				<div className="w-full flex flex-col gap-2">
					<label className="text-sm">Options</label>
					<div className="flex flex-col md:flex-row gap-2">
						<select
							id="option"
							className="block flex-1  p-2 ring-1 ring-red-100 border-red-300 rounded-md relative focus:ring-red-300 focus:border-red-300"
							onChange={handleSize}
							value={option.title || ""}
						>
							<option value="">Select Size</option>
							<option>Small</option>
							<option>Medium</option>
							<option>Large</option>
						</select>
						<input
							className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
							type="number"
							placeholder="Additional Price"
							name="additionalPrice"
							value={option.additionalPrice}
							onChange={handlePrice}
						/>

						<button
							type="button"
							className="bg-gray-500 p-2 text-white"
							onClick={handleOptionClick}
							disabled={option.title === "" || option.additionalPrice === 0}
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
