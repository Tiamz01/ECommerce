import React from "react";

const Clips = ({ clip, imgsrc }) => {
	return (
		<div>
			<div className=' relative h-28 w-28'>
				<img
					src={imgsrc}
					alt='img/clips'
				/>
				<video>
					<source
						type='video/mp4'
						src={clip}
					/>
				</video>
			</div>
		</div>
	);
};

export default Clips;
