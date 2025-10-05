import React, { lazy, Suspense } from "react";
import { heroapi, highlight, popularsales, sneaker, topratedsales, story, footerAPI } from "./data/data.js";

// Lazy load components
const Navbar = lazy(() => import("./component/Navbar"));
const Cart = lazy(() => import("./component/Cart"));
const Hero = lazy(() => import("./component/Hero"));
const Sales = lazy(() => import("./component/Sales"));
const FlexContent = lazy(() => import("./component/Flexcontent"));
const Stories = lazy(() => import("./component/Stories"));
const Footer = lazy(() => import("./component/Footer"));

const App = () => {
	// Loading fallback component
	const LoadingFallback = () => (
		<div className="flex justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	);

	return (
		<Suspense fallback={<LoadingFallback />}>
			<Navbar />
			<Cart />
			<main className='relative flex flex-col gap-16'>
				<Hero heroapi={heroapi} />
				<Sales
					endpoint={popularsales}
					ifExists
				/>
				<FlexContent
					endpoint={highlight}
					ifExists
				/>
				<Sales endpoint={topratedsales} />
				<FlexContent endpoint={sneaker} />
				<Stories story={story} />
			</main>
			<Footer footerApi={footerAPI} />
		</Suspense>
	);
};

export default App;