import React from "react";
import SocialLink from "../utils/SocialLink";
import Clips from "../utils/Clips";

const Hero = ({
	heroapi: { title, sociallinks, btntext, img, subtitle, videos }
}) => {
	return (
		<>
			<div className='relative h-auto w-auto flex flex-col'>
				<div className='bg-theme clip-path  h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10 '></div>
				<div className='relative opacity-100 z-20 grid justify-items-center items-center nike-container'>
					<div className='grid justify-items-center items-center mt-28 md:mt-24'>
						<h1 className=' text-6xl lg:te5xl text-center md:text-4xl sm:text-3xl xsm:text-2xl text-slate-200 font-extrabold filter drop-shadow-sm'>
							{title}
						</h1>
						<h1 className=' text-6xl lg:te5xl md:text-4xl sm:text-3xl xsm:text-2xl text-slate-200 font-extrabold filter drop-shadow-sm'>
							{subtitle}
						</h1>
						<button
							type='button'
							className='button-theme bg-slate-200 shadow-slate-200 rounded-xl my-5'
						>
							{btntext}
						</button>
						<div className='grid items-center gap-5 w-aut h-auto md:gap-3 absolute top-[45vh] lg:top-[50vh] left-[8%] xl:left-0 sm:top-[38vh] '>
							{videos?.map((val, i) => (
								<Clips
									key={i}
									imgsrc={val.imgsrc}
									clip={val.clip}
								/>
							))}
						</div>
						<div className='grid items-center absolute top-[33vh] right-0 gap-3'>
							{sociallinks?.map((val, i) => (
								<SocialLink
									key={i}
									icon={val.icon}
								/>
							))}
						</div>
					</div>
					<div className='flex items-center'>
						<img
							className='w-auto h-[45vh] lg:h-35vh md:h-[31vh] sm:h-[21vh] xsm:h-[17vh] transitions-theme -rotate-[25deg] hover:rotate-0 object-fill cursor-pointer mt-8'
							src={img}
							alt='hero-img/img'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
