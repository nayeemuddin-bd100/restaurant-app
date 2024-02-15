interface IParams {
	name: string;
	email: string;
	password: string;
}
const registerUser = async (userInfo: IParams) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userInfo),
	});
	return await res.json();
};

export default registerUser;
