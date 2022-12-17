import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	cartState: false,
	cartItems: localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart"))
		: [] //let suppoise it a database
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

				toast.success(` item QTY increased`);
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
	setClearCart
} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;

export default CartSlice.reducer;
