export default function Video({ value }) {
	const isYouTubeUrl = (url) => {
		return url.includes("youtube.com") || url.includes("youtu.be");
	};

	const getYouTubeVideoId = (url) => {
		const regex =
			/(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+\/(?:\S+)?v=|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}))/;
		const match = url.match(regex);
		return match ? match[1] : "";
	};

	return (
		<div className="p-2 px-sm-4 py-sm-2">
			{isYouTubeUrl(value) ? (
				<iframe
					className="col-12"
					height="auto"
					src={`https://www.youtube.com/embed/${getYouTubeVideoId(value)}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="YouTube video"
				></iframe>
			) : (
				<video src={value} controls className="col-12">
					Il tuo browser non supporta il tag video.
				</video>
			)}
		</div>
	);
}
