import React, { useEffect, useState } from "react";
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
import Checkout from "./Checkout";

const Cart = () => {
	const dispatch = useDispatch();
	const ifCartState = useSelector(selectCartState);
	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectTotalAmount);
	const totalQty = useSelector(selectTotalQty);
	const [checkoutState, setCheckoutState] = useState(false);

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
	
	const onCheckoutToggle = () => {
		setCheckoutState(!checkoutState);
	};
	
	const onBackToCart = () => {
		setCheckoutState(false);
	};

	const onClearCart = () => {
		dispatch(setClearCart());
	};
	
	if (checkoutState) {
		return (
			<Checkout 
				onCheckoutToggle={onCheckoutToggle}
				onBackToCart={onBackToCart}
			/>
		);
	}

	return (
		<>
			<div
				className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[300] ${
					ifCartState
						? "opacity-100 visible translate-x-0"
						: "opacity-0 invisible translate-x-8"
				}`}
			>
				<div
					className={`blur-effect-theme h-screen max-w-xl w-full absolute right-0 sm:max-w-full`}
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
							<div className='flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 md:gap-y-4 sm:gap-y-3 overflow-y-scroll h-[75vh] scroll-smooth scroll-hidden px-3 pt-3'>
								{cartItems?.map((item, i) => (
									<CartItem
										key={i}
										item={item}
									/>
								))}
							</div>

							<div className='fixed bottom-0 bg-white w-full px-5 py-2 grid items-center sm:px-3 sm:py-1.5'>
								<div className='flex items-center justify-between'>
									<h1 className='text-base font-semibold uppercase sm:text-sm'>
										SubTotal:
									</h1>
									<h1 className="text-sm text-slate-100 px-1 py-0.5 bg-theme-cart rounded-lg sm:text-xs">
										${totalAmount}
									</h1>
								</div>
								<div className='grid items-center gap-2 sm:gap-1.5'>
									<p className='text-center text-sm font-medium sm:text-xs'>
										taxes and shipping will calculate at Shipping
									</p>
									<button
										type='button'
										onClick={onCheckoutToggle}
										className='button-theme bg-theme-cart text-white sm:text-sm'
									>
										Proceed to Checkout
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