import React from "react";

const Clips = ({ clip, imgsrc }) => {
	return (
		<>
			<div className=' relative h-28 w-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group '>
				<img
					className='inset-0 flex h-full w-full object-cover absolute top-0 left-0 rounded-xl opacity-100 z-10 transition-opacity duration-500'
					src={imgsrc}
					alt='img/clips'
				/>
				<video
					className='absolute object-cover left-0 right-0 flex h-full w-full z-0 opacity-0 group-hover:opacity-100 group-hover:z-20'
					autoPlay={true}
					loop={true}
					muted={true}
					playsInline={true}
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
