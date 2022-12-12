import React from "react";
import { Hero, Sales, FlexContent, Stories } from "./component";
import {
	heroapi,
	highlight,
	popularsales,
	sneaker,
	topratedsales,
	story
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
			</main>
		</>
	);
};

export default App;
