"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteButton = ({ id }: { id: string }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated" || !session?.user.isAdmin) {
		return;
	}

	const handleDelete = async () => {
		const res = await fetch(`http://localhost:3000/api/products/${id}`, {
			method: "DELETE",
		});

		if (res.status === 200) {
			router.push("/menu");
			toast.success("The product has been deleted!");
		}
	};

	return (
		<button
			className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full top-4 right-8 absolute"
			onClick={handleDelete}
		>
			<Image src="/delete.png" alt="" width={20} height={20} />
		</button>
	);
};

export default DeleteButton;
