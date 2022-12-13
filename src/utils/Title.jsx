import React from "react";

const Title = ({ title }) => {
	console.log(title);
	return (
		<div>
			<div className='grid items-center'>
				<h1 className=' text-5xl lg:text-4xl md:text-3xl font-bold to-slate-900'>
					{title}
				</h1>
			</div>
		</div>
	);
};

export default Title;
