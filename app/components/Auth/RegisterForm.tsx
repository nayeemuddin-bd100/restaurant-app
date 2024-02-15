"use client";
import registerUser from "@/app/lib/registerUser";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

//form validation using formik
const formSchema = Yup.object({
	name: Yup.string()
		.min(3, "Name must be at least 3 characters")
		.max(20, "Name must be less than 20 characters")
		.required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async (value) => {
			setIsLoading(true);

			try {
				const data = await registerUser(value);
				if (data.error) {
					toast.error(data.error);
				}

				if (data?.email) {
					toast.success("Registered Successfully");
				}
			} catch (error: any) {
				toast.error(error.message);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		validationSchema: formSchema,
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="w-full mx-auto">
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="name"
						id="name"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={formik.values.name}
						onChange={formik.handleChange("name")}
						onBlur={formik.handleBlur("name")}
					/>
					<label
						htmlFor="name"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Name
					</label>
				</div>
				{/* Error message */}
				<div className="text-red-400 mb-2 ">
					{formik.touched.name && formik.errors.name}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="email"
						name="email"
						id="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={formik.values.email}
						onChange={formik.handleChange("email")}
						onBlur={formik.handleBlur("email")}
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Email address
					</label>
				</div>
				{/* Error message */}
				<div className="text-red-400 mb-2 ">
					{formik.touched.email && formik.errors.email}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="password"
						name="password"
						id="password"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={formik.values.password}
						onChange={formik.handleChange("password")}
						onBlur={formik.handleBlur("password")}
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Password
					</label>
				</div>
				{/* Error message */}
				<div className="text-red-400 mb-2 ">
					{formik.touched.password && formik.errors.password}
				</div>

				<button
					disabled={isLoading}
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
				>
					{isLoading ? "Loading..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
