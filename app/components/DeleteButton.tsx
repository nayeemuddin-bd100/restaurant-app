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

	const demoAdmin = "admin.pizza@king.com";
	const baseProduct = [
		"65cba0882f878312666ee9ba",
		"65cba10f2f878312666ee9bb",
		"65cba2ac2f878312666ee9bc",
		"65cba3042f878312666ee9bd",
		"65cba3862f878312666ee9be",
		"65cc5f1dfcdc4e94e6b0abd1",
		"65cc5fb3fcdc4e94e6b0abd2",
		"65cc602efcdc4e94e6b0abd3",
		"65cc798cfcdc4e94e6b0abd4",
		"65cc7a01fcdc4e94e6b0abd5",
		"65cc7a48fcdc4e94e6b0abd6",
		"65cc7e04fcdc4e94e6b0abdb",
	];
	const handleDelete = async () => {
		if (session?.user.email === demoAdmin && baseProduct.includes(id)) {
			toast.error(
				"Demo admins can't delete base files. Add a product to test the delete functionality."
			);
			return;
		} else {
			const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
				method: "DELETE",
			});

			if (res.status === 200) {
				router.push("/menu");
				toast.success("The product has been deleted!");
			}
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
