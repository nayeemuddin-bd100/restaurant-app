import { useFormik } from "formik";
import * as Yup from "yup";

//form validation using formik
const formSchema = Yup.object({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (value) => {
			console.log(value);

			// dispatch(loginUserAction(value));
		},
		validationSchema: formSchema,
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="w-full mx-auto">
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="email"
						name="email"
						id="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
						onChange={formik.handleChange("password")}
						onBlur={formik.handleBlur("password")}
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Password
					</label>
					{/* Error msg */}
					<div className="text-red-400 mb-2">
						{formik.touched.password && formik.errors.password}
					</div>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
