import Link from "next/link";

const Footer = () => {
	return (
		<div className="h-15 sm:h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between uppercase text-xs sm:text-base ">
			<Link href="/" className="font-bold text-xl">
				BurgerKing
			</Link>
			<p>Made with ❤️ by Nayeem</p>
		</div>
	);
};

export default Footer;
