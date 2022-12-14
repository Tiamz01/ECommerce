import React from "react";
import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

const CartCount = ({ onCartToggle, totalQty, onClearCart }) => {
	return (
		<>
			<div className='bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full'>
				<div className='flex items-center gap-3 '>
					<div className='grid items-center cursor-pointer onClick={onCartToggle }'>
						<ChevronDoubleLeftIcon
							onClick={onCartToggle}
							className='w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2]'
						/>
					</div>
					<div className='grid items-center '>
						<h1 className=' text-base font-normal text-slate-900'>
							your cart
							<span className='bg-theme-cart text-slate-100 rounded px-1 py-0.5 text-sm'>
								({totalQty} items)
							</span>
						</h1>
					</div>
				</div>
				<div className='flex item-center '>
					<button
						type='button'
						onClick={onClearCart}
						className='bg-theme-cart  rounded active:scale-90'
					>
						<XMarkIcon className='h-5 w-5 text-white stroke-[2] ' />
					</button>
				</div>
			</div>
		</>
	);
};

export default CartCount;
