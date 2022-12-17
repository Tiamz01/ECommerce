import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectCartItems,
	selectCartState,
	selectTotalAmount,
	selectTotalQty,
	setClearCart,
	setCloseCart,
	setGetTotals
} from "../app/CartSlice.js";
import CartCount from "./Cart/CartCount";
import CartEmpty from "./Cart/CartEmpty";
import CartItem from "./Cart/CartItem";

const Cart = () => {
	const dispatch = useDispatch();
	const ifCartState = useSelector(selectCartState);
	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectTotalAmount);
	const totalQty = useSelector(selectTotalQty);

	useEffect(() => {
		dispatch(setGetTotals());
	}, [cartItems, dispatch]);

	const onCartToggle = () => {
		dispatch(
			setCloseCart({
				cartState: false
			})
		);
	};
	const onClearCart = () => {
		dispatch(setClearCart());
	};
	return (
		<>
			<div
				className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[300] ${
					ifCartState
						? " opacity-100  visible translate-x-0"
						: " opacity-0 invisible translate-x-8 "
				}`}
			>
				<div
					className={`blur-effect-theme h-screen max-w-xl w-full absolute right-0`}
				>
					<CartCount
						onCartToggle={onCartToggle}
						onClearCart={onClearCart}
						totalQty={totalQty}
					/>
					{cartItems?.length === 0 ? (
						<CartEmpty onCartToggle={onCartToggle} />
					) : (
						<div>
							<div className='flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[75vh] scroll-smooth scroll-hidden px-3 pt-3 '>
								{cartItems?.map((item, i) => (
									<CartItem
										key={i}
										item={item}
									/>
								))}
							</div>

							<div className='fixed bottom-0 bg-white w-full px-5 py-2 grid items-center'>
								<div className='flex items-center justify-between'>
									<h1 className=' text-base font-semibold uppercase  '>
										SubTotal:
									</h1>
									<h1 className="text-sm text-slate-100 px-1 py-0.5 bg-theme-cart  rounded-lg'">
										${totalAmount}
									</h1>
								</div>
								<div className='grid items-center  gap-2'>
									<p className=' text-center text-sm font-medium'>
										taxes and shipping will calculate at Shipping
									</p>
									<button
										type='button'
										className='button-theme bg-theme-cart  text-white'
									>
										Check out
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
