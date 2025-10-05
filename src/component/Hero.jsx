import React from "react";
import SocialLink from "../utils/SocialLink";
import Clips from "../utils/Clips";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = ({
	heroapi: { title, sociallinks, btntext, img, subtitle, videos }
}) => {
	return (
		<>
			<div className='relative h-auto w-auto flex flex-col'>
				<div className='bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] xsm:h-[50vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
				<div className='relative opacity-100 z-20 grid justify-items-center items-center nike-container'>
					<div className='grid justify-items-center items-center mt-28 md:mt-24 sm:mt-20 xsm:mt-16'>
						<h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl text-center text-slate-200 font-extrabold filter drop-shadow-sm mb-2'>
							{title}
						</h1>
						<h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl text-center text-slate-200 font-extrabold filter drop-shadow-sm'>
							{subtitle}
						</h1>
						<button
							type='button'
							className='button-theme bg-slate-200 shadow-slate-200 rounded-xl my-5 sm:my-3 xsm:my-2 sm:text-sm xsm:text-xs sm:px-5 sm:py-1.5'
						>
							{btntext}
						</button>
						<div className='grid items-center gap-5 w-auto h-auto md:gap-3 absolute top-[46vh] lg:top-[48vh] md:top-[40vh] sm:top-[35vh] xsm:top-[30vh] left-[8%] xl:left-0 sm:left-[5%] xsm:left-0'>
							{videos?.map((val, i) => (
								<Clips
									key={i}
									imgsrc={val.imgsrc}
									clip={val.clip}
								/>
							))}
						</div>
						<div className='grid items-center absolute top-[33vh] right-[2%] sm:right-[1%] xsm:right-0 gap-3 sm:gap-2'>
							{sociallinks?.map((val, i) => (
								<SocialLink
									key={i}
									icon={val.icon}
								/>
							))}
						</div>
					</div>
					<div className='flex items-center justify-center'>
						<LazyLoadImage
							alt='hero-img/img'
							effect="blur"
							src={img}
							className='w-auto h-[45vh] lg:h-[35vh] md:h-[28vh] sm:h-[21vh] xsm:h-[17vh] sm:w-[18rem] xsm:w-[14rem] transitions-theme-slow -rotate-[25deg] hover:rotate-6 object-fill cursor-pointer mt-8 sm:mt-4'
							threshold={100}
							placeholderSrc={img}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;