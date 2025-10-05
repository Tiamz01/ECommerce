import React from "react";

const FlexContent = ({
	ifExists,
	endpoint: { heading, title, text, btn, url, img }
}) => {
	return (
		<>
			<div
				className={`flex  items-center justify-between lg:justify-center lg:flex-col nike-container ${
					ifExists ? "flex-row-reverse" : "flex-row"
				}`}
			>
				<div className='max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center  '>
					<h1 className='text-4xl sm:text-3xl font-bold text-gradient'>
						{heading}
					</h1>
					<h1 className=' text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg'>
						{title}
					</h1>
					<p className=' xl:text-sm my-4 text-slate-900 text-justify max-w-[500px] lg:text-center'>
						{text}
					</p>
					<a
						className='flex items-center '
						target={"_blank"}
						rel='stylesheet'
						href={url}
						role='button'
					>
						<button
							type='button'
							className='button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'
						>
							{btn}
						</button>
					</a>
				</div>
				<div
					className={`relative flex items-center justify-center max-w-xl lg:max-w-none w-full `}
				>
					<img
						src={img}
						alt={`img/${heading}`}
						className={`transitions-theme-slow w-auto object-fill mt-7 ${
							ifExists
								? "h-60 lg:h-56 md:h-52 sm:h-44 xsm:h-36 rotate-6 hover:rotate-9  "
								: " h-72 lg:h-64 md:h-60 sm:h-48 xsm:h-40 rotate-[19deg] hover:rotate-[22deg]"
						} transition-transform duration-5000 ease-in-out`}
					/>
				</div>
			</div>
		</>
	);
};

export default FlexContent;