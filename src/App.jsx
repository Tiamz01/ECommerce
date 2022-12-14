import React from "react";
import { Hero, Sales, FlexContent, Stories, Footer } from "./component";
import {
	heroapi,
	highlight,
	popularsales,
	sneaker,
	topratedsales,
	story,
	footerAPI
} from "./data/data.js";

const App = () => {
	return (
		<>
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
				<Footer footerAPI={footerAPI} />
			</main>
		</>
	);
};

export default App;
