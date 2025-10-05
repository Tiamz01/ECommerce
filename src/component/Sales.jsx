import React from "react";
import Title from "../utils/Title";
import Item from "../utils/Item";

const Sales = ({ ifExists, endpoint: { title, items } }) => {
	return (
		<div className='py-4'>
			<div className='nike-container'>
				<Title title={title} />
				<div
					className={`grid items-center justify-items-center gap-7 lg:gap-5 md:gap-4 sm:gap-3 mt-7 ${
						ifExists
							? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
							: "grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
					}`}
				>
					{items?.map((item, i) => (
						<Item
							{...item}
							i={i}
							key={item.id}
							ifExists={ifExists}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sales;