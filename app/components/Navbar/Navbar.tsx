import Link from "next/link";
import Menu from "../Menu";
import Image from "next/image";
import CartIcon from "../CartIcon";
import UserLink from "./UserLink";

const Navbar = () => {
	const user = false;
	return (
		<div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
			{/* LEFT LINKS */}
			<div className="hidden md:flex gap-4 w-[40%] lg:w-2/5">
				<Link href="/">Homepage</Link>
				<Link href="/menu">Menu</Link>
				<Link href="/all-items">All Items</Link>
			</div>
			{/* Logo */}
			<div className="text-xl md:font-bold md:text-center w-[10%] lg:1/5">
				<Link href="/">PizzaKing</Link>
			</div>
			{/* Mobile Menu */}
			<div className="md:hidden">
				<Menu />
			</div>
			{/* RIGHT LINKS */}
			<div className="hidden md:flex gap-4 items-center justify-end w-[50%] lg:w-2/5">
				<div className="md:absolute top-3 r-2 flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
					<Image src="/phone.png" alt="" width={20} height={20} />
					<span>123 456 78</span>
				</div>
				<UserLink />
				<CartIcon />
			</div>
		</div>
	);
};

export default Navbar;
