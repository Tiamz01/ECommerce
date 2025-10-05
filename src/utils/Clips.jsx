import React, { useState, useRef, useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

const Clips = ({ clip, imgsrc }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const videoRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
				if (entry.isIntersecting && videoRef.current) {
					// Load and play video when in view
					videoRef.current.load();
					setIsLoaded(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, []);

	const handlePlay = () => {
		if (videoRef.current) {
			videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
		}
	};

	return (
		<>
			<div 
				ref={containerRef}
				className='relative h-28 w-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 group lg:w-28 -top-7 md:w-24 sm:w-16 lg:h-24 md:h-20 sm:h-14'
			>
				<img
					className={`inset-0 flex h-full w-full object-cover absolute top-0 left-0 rounded-xl opacity-100 z-10 transition-opacity duration-700 ${isLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
					src={imgsrc}
					alt='img/clips'
				/>
				<div
					className={`bg-white blur-effect-theme absolute top-10 left-10 lg:top-8 lg:left-9 sm:top-4 sm:left-5 right-0 opacity-100 z-[100] rounded-full w-9 h-9 md:w-5 md:h-5 flex justify-center items-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
				>
					<PlayCircleIcon className='icon-style text-slate-900' />
				</div>
				<video
					ref={videoRef}
					className={`absolute object-cover left-0 right-0 flex h-full w-full z-0 rounded-xl transition-opacity duration-700 ${isLoaded && isInView ? 'opacity-100 group-hover:z-20' : 'opacity-0'}`}
					autoPlay={false}
					loop={true}
					muted={true}
					playsInline={true}
					onMouseEnter={handlePlay}
					onTouchStart={handlePlay}
				>
					<source
						type='video/mp4'
						src={clip}
					/>
				</video>
			</div>
		</>
	);
};

export default Clips;