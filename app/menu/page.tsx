import Link from "next/link";
import React from "react";
import { menu } from "../data";

const MenuPage = () => {
	return (
		<div className="p-4 lg:px-20 xl:px-40 mt-20 flex flex-col md:flex-row items-center ">
			{menu.map((category: any) => (
				<Link
					href={`/menu/${category.slug}`}
					key={category.id}
					className="w-full h-full bg-cover p-8 md:h-1/2 overflow-hidden"
					style={{ backgroundImage: `url(${category.img})` }}
				>
					<div className={`text-${category.color} w-1/2`}>
						<h1 className="uppercase font-bold text-3xl">{category.title}</h1>
						<p className="text-sm my-8 ">{category.desc}</p>
						<button
							className={`
							hidden md:block
							bg-${category.color} 
						
							text-${category.color === "black" ? "white" : "red-500"}
							py-2 px-4 rounded-md
						`}
						>
							Explore
						</button>
					</div>
				</Link>
			))}
		</div>
	);
};

export default MenuPage;
