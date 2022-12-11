import React from "react";
import { Hero, Sales } from "./component";
import { heroapi, popularsales, topratedsales } from "./data/data.js";

const App = () => {
	return (
		<>
			<main className='relative flex flex-col gap-16'>
				<Hero heroapi={heroapi} />
				<Sales endpoint={popularsales} />
				<Sales endpoint={topratedsales} />
			</main>
		</>
	);
};

export default App;
