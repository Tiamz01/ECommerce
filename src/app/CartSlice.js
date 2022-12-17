import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	cartState: false,
	cartItems: localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart"))
		: [], //let suppoise it a database
	cartTotalAmount: 0,
	cartTotalQuantity: 0
};

const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setOpenCart: (state, action) => {
			state.cartState = action.payload.cartState;
		},
		setCloseCart: (state, action) => {
			state.cartState = action.payload.cartState;
		},
		setAddItemToCart: (state, action) => {
			//this finds the index of existing items we are selecting if it match new  product selected
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);

			// this is used to filter our items to increase the quantity if product is same
			if (itemIndex >= 0) {
				state.cartItems[itemIndex].cartQuantity += 1;

				toast.success(` ${action.payload.title} added to cart`);
			} else {
				const temp = { ...action.payload, cartQuantity: 1 };
				state.cartItems.push(temp);

				toast.success(`${action.payload.title} added to cart`);
			}

			localStorage.getItem("cart", JSON.stringify(state.cartItems));
		},

		setRemoveItemFromCart: (state, action) => {
			const removeItem = state.cartItems.filter(
				(item) => item.id !== action.payload.id
			);

			state.cartItems = removeItem;
			//define our storage for delete
			localStorage.setItem("cart", JSON.stringify(state.cartItems));

			toast.success(` ${action.payload.title} Removed from cart`);
		},

		setItemQtyIncrease: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);

			// this is used to filter our items to increase the quantity if product is same
			if (itemIndex >= 0) {
				state.cartItems[itemIndex].cartQuantity += 1;

				toast.success(` item QTY increased`);
			}
			localStorage.getItem("cart", JSON.stringify(state.cartItems));
		},
		setItemQtyDecrease: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);

			// this is used to filter our items to increase the quantity if product is same
			if (state.cartItems[itemIndex].cartQuantity > 1) {
				state.cartItems[itemIndex].cartQuantity -= 1;

				toast.success(` item QTY decreased`);
			}
			localStorage.getItem("cart", JSON.stringify(state.cartItems));
		},
		setClearCart: (state) => {
			state.cartItems = [];

			toast.success(` Cart Cleard`);
			localStorage.getItem("cart", JSON.stringify(state.cartItems));
		},

		setGetTotals: (state, action) => {
			let { totalAmount, totalQty } = state.cartItems.reduce(
				(cartTotal, cartItem) => {
					const { price, cartQuantity } = cartItem;

					const totalPrice = price * cartQuantity;

					cartTotal.totalAmount += totalPrice;
					cartTotal.totalQty += cartQuantity;

					return cartTotal;
				},
				{ totalAmount: 0, totalQty: 0 }
			);

			state.cartTotalAmount = totalAmount;
			state.cartTotalQuantity = totalQty;
		}
	}
});

export const {
	setOpenCart,
	setCloseCart,
	setAddItemToCart,
	setRemoveItemFromCart,
	setItemQtyIncrease,
	setItemQtyDecrease,
	setClearCart,
	setGetTotals
} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQty = (state) => state.cart.cartTotalQuantity;

export default CartSlice.reducer;
