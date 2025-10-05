import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import {
	setClearCart,
	setItemQtyDecrease,
	setItemQtyIncrease,
	setRemoveItemFromCart
} from "../../app/CartSlice.js";

const CartItem = ({
	item: { id, title, text, img, price, color, shadow, cartQuantity }
}) => {
	const dispatch = useDispatch();

	const onRemoveItem = () => {
		dispatch(setRemoveItemFromCart({ id, title }));
	};
	const qtyIncrease = () => {
		dispatch(setItemQtyIncrease({ id }));
	};
	const qtyDecrease = () => {
		dispatch(setItemQtyDecrease({ id }));
	};

	return (
		<>
			<div className='flex items-center justify-between w-full sm:flex-col sm:items-start sm:gap-3'>
				<div className='flex items-center gap-5 relative sm:gap-3'>
					<div
						className={`${color} bg-gradient-to-b ${color} ${shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center sm:p-2`}
					>
						<img
							className='w-36 h-auto object-fit lg:w-28 md:w-24 sm:w-20 px-1 py-1'
							src={img}
							alt={`img//cart-items/${id}`}
						/>
						<div className='absolute blur-theme-effect right-1 top-1 bg-white/80 text-black text-xs px-1 rounded sm:text-[0.6rem] sm:px-0.5 sm:top-0.5 sm:right-0.5'>
							{price}
						</div>
					</div>
					<div className='grid items-center gap-4 sm:gap-2'>
						<div className='grid items-center leading-none'>
							<h1 className='font-medium text-lg text-slate-800 lg:text-sm md:text-base sm:text-sm'>
								{title}
							</h1>
							<p className='text-sm text-slate-900 lg:text-xs sm:text-xs'>{text}</p>
						</div>
						<div className='flex justify-around items-center w-[150px] sm:w-[120px]'>
							<button
								type='button'
								onClick={qtyDecrease}
								className='bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 sm:w-5 sm:h-5 flex items-center justify-center active:scale-90'
							>
								<MinusIcon className='w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3 text-white stroke-[2]' />
							</button>
							<div className='bg-theme-cart font-medium text-white rounded w-7 h-6 lg:w-6 lg:h-5 sm:w-6 sm:h-5 flex items-center justify-center'>
								{cartQuantity}
							</div>
							<button
								type='button'
								onClick={qtyIncrease}
								className='bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 sm:w-5 sm:h-5 flex items-center justify-center active:scale-90'
							>
								<PlusIcon className='w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3 text-white stroke-[2]' />
							</button>
						</div>
					</div>
				</div>
				<div className='grid items-center gap-5 sm:flex sm:items-center sm:justify-between sm:w-full sm:gap-3'>
					<div className='grid items-center justify-center'>
						<h1 className='text-lg lg:text-base text-slate-900 font-medium sm:text-sm'>
							${price * cartQuantity}
						</h1>
					</div>
					<div className='grid justify-center items-center'>
						<button
							type='button'
							onClick={onRemoveItem}
							className='bg-theme-cart rounded grid items-center justify-center p-1 lg:p-0.5 sm:p-0.5'
						>
							<TrashIcon className='w-5 h-5 text-white sm:w-4 sm:h-4' />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartItem;