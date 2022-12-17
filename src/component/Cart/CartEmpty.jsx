import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import emptyBag from "../../assets/emptybag.png";

const CartEmpty = ({ onCartToggle }) => {
	return (
		<div>
			<div className='flex items-center justify-center  flex-col gap-7 h-screen px-11 text-center'>
				<img
					src={emptyBag}
					alt='emptybag/img'
					className='grid items  h-auto w-40 lg:w-36 sm:w-28 object-fill transition-all duration-1000 hover:scale-110'
				/>
				<button
					onClick={onCartToggle}
					className='button-theme bg-gradient-to-b from-amber-500 to-orange-500 flex items-center gap-4 justify-center shadow-lg shadow-orange-500 py-2 text-slate-800 active:scale-110'
				>
					<ArrowLeftIcon className='w-5 h-5' />
					<span className=' capitalize'>Back to nike store</span>
				</button>
			</div>
		</div>
	);
};

export default CartEmpty;
