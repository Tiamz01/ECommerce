import React from "react";
import { useDispatch } from "react-redux";
import { setAddItemToCart, setOpenCart } from "../app/CartSlice.js";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Items = ({
	ifExists,
	id,
	title,
	text,
	rating,
	btn,
	img,
	price,
	color,
	shadow
}) => {
	const dispatch = useDispatch();

	const onAddToCart = () => {
		const item = { id, title, text, img, color, shadow, price };

		dispatch(setAddItemToCart(item));
	};

	const onCartToggle = () => {
		dispatch(
			setOpenCart({
				cartState: true
			})
		);
	};
	return (
		<>
			<div
				className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center gap-2 ${
					ifExists ? "justify-items-start" : "justify-items-center"
				} w-full transition-all ease-in-out duration-500 rounded-xl hover:scale-105 py-4 px-3 sm:py-3 sm:px-2`}
			>
				<div
					className={`grid items-center ${
						ifExists ? "justify-items-start" : "justify-items-center"
					}`}
				>
					<h1 className='text-slate-200 text-base md:text-sm sm:text-xs font-medium filter drop-shadow'>
						{title}
					</h1>
					<p className='text-slate-200 text-xl lg:text-lg md:text-base sm:text-sm font-normal filter drop-shadow'>
						{text}
					</p>
				</div>
				<div className='flex items-center justify-between w-28 sm:w-24 gap-8 md:gap-6 sm:gap-4 my-2'>
					<div className='flex items-center bg-white/80 px-1 rounded blur-effect-theme font-medium'>
						<h1 className='text-sm md:text-xs text-black font-medium'>${price}</h1>
					</div>
					<div className='flex items-center justify-center gap-1'>
						<StarIcon className='icon-style text-white w-5 h-5 md:w-4 md:h-4 sm:w-3 sm:h-3' />
						<h1 className='md:text-sm sm:text-xs font-normal text-slate-100'>{rating}</h1>
					</div>
				</div>
				<div className='flex items-center gap-2 sm:gap-1'>
					<button
						type='button'
						onClick={() => onAddToCart()}
						className='bg-white-90 blur-effect-theme button-theme p-0.5 shadow shadow-slate-200 sm:p-0.5'
					>
						<ShoppingBagIcon className='icon-style text-slate-900 sm:w-4 sm:h-4' />
					</button>
					<button
						type='button'
						onClick={() => {
							onAddToCart();
							onCartToggle();
						}}
						className='bg-white-90 blur-effect-theme button-theme px-2 py-1 shadow shadow-slate-200 text-sm text-black sm:px-1.5 sm:py-0.5 sm:text-xs'
					>
						{btn}
					</button>
				</div>
				<div
					className={`flex items-center ${
						ifExists ? "absolute top-4 right-1" : "justify-center"
					}`}
				>
					<LazyLoadImage
						alt={`item-Img/${id}`}
						effect="blur"
						src={img}
						className={`transitions-theme-slow hover:-rotate-3 mt-3 ${
							ifExists
								? "h-auto w-60 lg:w-56 md:w-48 sm:w-40 xsm:w-32 -rotate-[36deg]"
								: "h-30 w-15 sm:w-24 xsm:w-20"
						} transition-transform duration-[10000ms] ease-in-out`}
						threshold={100}
						placeholderSrc={img}
					/>
				</div>
			</div>
		</>
	);
};

export default Items;