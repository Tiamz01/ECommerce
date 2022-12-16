import React from "react";
import { useDispatch } from "react-redux";
import { setAddItemToCart } from "../app/CartSlice.js";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";

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
	return (
		<>
			<div
				className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center  ${
					ifExists ? " justify-items-start" : " justify-items-center"
				} w-full transition-all ease-in-out duration-700 rounded-xl hover:scale-105 py-4 px-3`}
			>
				<div
					className={`grid items-center justify-items-center ${
						ifExists ? " justify-items-start" : " justify-items-center"
					} `}
				>
					<h1 className=' text-slate-200 text-base  md:text-base font-medium filter drop-shadow'>
						{title}
					</h1>
					<p className=' text-slate-200 text-xl lg:text-lg md:text-sm font-normal filter drop-shadow'>
						{text}
					</p>
				</div>
				<div className='flex items-center justify-between w-28 gap-8 md:gap-6 my-2'>
					<div className='flex items-center bg-white/80 px-1 rounded blur-effect-theme font-medium '>
						<h1 className='text-sm text-black font-medium'>${price}</h1>
					</div>
					<div className='flex items-center justify-center gap-1'>
						<StarIcon className='  icon-style text-white w-5 h-5 md:w-4 md:h-4 ' />
						<h1 className=' md:text-sm font-normal text-slate-100'>{rating}</h1>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={() => onAddToCart()}
						className=' bg-white-90 blur-effect-theme button-theme p-0.5 shadow shadow-slate-200'
					>
						<ShoppingBagIcon className='icon-style text-slate-900' />
					</button>
					<button
						type='button'
						className='bg-white-90 blur-effect-theme button-theme px-2 py-1 shadow shadow-slate-200 text-sm text-black'
					>
						{btn}
					</button>
				</div>
				<div
					className={`flex items-center ${
						ifExists ? " absolute top-5 right-1" : " justify-center"
					} `}
				>
					<img
						className={`transitions-theme hover:-rotate-12 mt-4 ${
							ifExists
								? " h-auto w-60 lg:w-56 md:w-48 -rotate-[36deg] "
								: " h-30 w-30"
						}`}
						src={img}
						alt={`item-Img/${id}`}
					/>
				</div>
			</div>
		</>
	);
};

export default Items;
