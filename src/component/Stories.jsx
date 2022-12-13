import React from "react";
import Title from "../utils/Title";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ClockIcon, HashtagIcon, HeartIcon } from "@heroicons/react/24/solid";

const Stories = ({ story: { title, news } }) => {
	const splideOptions = {
		perPage: 4,
		PerMove: 1,
		type: "loop",
		rewind: true,
		Keyboard: "global",
		gap: "1rem",
		pagiantion: false,
		padding: "2rem",
		breakpoints: {
			1200: { perPage: 3 },
			991: { perPage: 2.3 },
			768: { perPage: 2 },
			500: { perPage: 1.3 },
			425: { perPage: 1 }
		}
	};
	return (
		<>
			<div className='nike-container'>
				<Title title={title} />
				<div className='mt-7'>
					<Splide options={splideOptions}>
						{news?.map((val, i) => (
							<SplideSlide
								key={i}
								className='mb-0.5'
							>
								<div className='relative grid items-center gap-4 pb-3 rounded-lg shadow shadow-slate-200 ring-1'>
									<img
										className='w-full h-auto object-cover shadow-md shadow-slate-200 rounded-tl-lg rounded-tr-lg'
										src={val.img}
										alt={`img/story/${i}`}
									/>
									<div className='flex items-center justify-between w-full px-3 '>
										<div className='flex items-center justify-center gap-3'>
											<HeartIcon className='icon-style text-red-600 w-5 h-5' />
											<span className='font-bold text-xs'>{val.like}</span>
										</div>
										<div className='flex items-center justify-center gap-1 '>
											<ClockIcon
												className='icon-style w-5 h-5
										text-black'
											/>
											<span className='font-bold text-xs'>{val.time}</span>
										</div>
										<div className='flex items-center justify-center gap-1'>
											<HashtagIcon
												className='icon-style  w-4 h-4
										text-blue-500'
											/>
											<span className='text-blue-800 font-bold text-xs'>
												{val.by}
											</span>
										</div>
									</div>
									<div className='grid items-center  '>
										<h1 className=' text-base font-semibold lg:text-sm px-4'>
											{val.title}
										</h1>
										<p className=' text-justify text-sm px-4 lg:text-xs '>
											{val.text}
										</p>
									</div>
									<div
										className='flex
									items-center
									justify-between
									w-full
									px-5'
									>
										<a
											href={val.url}
											role={"button"}
											target={"_blank"}
											className='w-full bg-gradient-to-b from-slate-900 to-black shadow-md shadow-black text-center text-slate-100 button-theme'
										>
											{val.btn}
										</a>
									</div>
								</div>
							</SplideSlide>
						))}
					</Splide>
				</div>
			</div>
		</>
	);
};

export default Stories;
