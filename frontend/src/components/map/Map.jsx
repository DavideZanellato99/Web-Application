export default function Map({ value }) {
	return (
		<div className="p-2 px-sm-4 py-sm-2">
			<iframe
				className="col-12"
				height="auto"
				src={value}
				title="Map"
			></iframe>
		</div>
	);
}
