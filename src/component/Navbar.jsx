import {
	HeartIcon,
	MagnifyingGlassIcon,
	ShoppingBagIcon
} from "@heroicons/react/24/outline";
import logo from "./../assets/logo.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQty, setOpenCart } from "../app/CartSlice.js";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const totalQty = useSelector(selectTotalQty);
	const dispatch = useDispatch();
	const onCartToggle = () => {
		dispatch(
			setOpenCart({
				cartState: true
			})
		);
	};

	function onNavScroll() {
		if (window.scrollY > 3) {
			setNav(true);
		} else {
			setNav(false);
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", onNavScroll);

		return () => {
			window.removeEventListener("scroll", onNavScroll);
		};
	}, []);
	return (
		<header
			className={
				!nav
					? "absolute top-7 left-0 right-0 opacity-100 z-50"
					: "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center blur-effect-theme z-[200]"
			}
		>
			<nav className='flex  items-center  justify-between nike-container'>
				<div className='flex items-center'>
					<img
						className={`w-[8rem] h-auto p-2 ${nav && "filter brightness-0"}`}
						src={logo}
						alt='Nike logo'
					/>
				</div>
				<ul className='flex items-center justify-center gap-2'>
					<li className='grid items-center'>
						<MagnifyingGlassIcon
							className={`icon-style ${
								nav && "text-slate-900 transition-all duration-300"
							}`}
						/>
					</li>
					<li className='grid items-center'>
						<HeartIcon
							className={`icon-style ${
								nav && "text-slate-900 transition-all duration-300"
							}`}
						/>
					</li>
					<li className='grid items-center'>
						<button
							type='button'
							onClick={onCartToggle}
							className='border-none outline-none active:scale-110 transition-all duration-300 relative'
						>
							<ShoppingBagIcon
								className={`icon-style ${
									nav && "text-slate-900 transition-all duration-300"
								}`}
							/>
							<div
								className={`absolute top-4 right-0  shadow shadow-slate-100 w-4 h-4 text-[.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
									nav
										? " bg-slate-900 text-slate-100 shadow-slate-900 "
										: " bg-slate-100  shadow-slate-100 text-slate-900"
								}`}
							>
								{totalQty}
							</div>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
