import Link from "next/link";
import React from "react";
import { MenuType } from "../types/types";
import getCategories from "../lib/getCategories";

const MenuPage = async () => {
	const menu: MenuType = await getCategories();

	return (
		<div className="p-4 lg:px-20 xl:px-40 mt-20 flex flex-col md:flex-row items-center ">
			{menu.map((category: any) => (
				<div
					key={category.id}
					className="w-full h-full bg-cover p-8 md:h-1/2 overflow-hidden"
					style={{ backgroundImage: `url(${category?.img})` }}
				>
					<div className={`text-${category?.color} w-1/2`}>
						<h1 className="uppercase font-bold text-3xl">{category.title}</h1>
						<p className="text-sm my-8 ">{category?.desc}</p>
						<Link href={`/menu/${category.slug}`}>
							<button
								className={`
							
							bg-black
							hover:bg-red-500
							text-white
							py-2 px-4 rounded-md
						`}
							>
								Explore
							</button>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default MenuPage;
