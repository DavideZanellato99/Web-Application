import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Layouts from "./components/layout/Layout";

export default function Page() {
	const navigate = useNavigate();

	const { pathname } = useLocation();
	let pageId = pathname.substring(1);

	const [title, setTitle] = useState();
	const [layouts, setLayouts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const url = `${process.env.REACT_APP_BACKEND_HOST}/api/page/${pageId.replace("/", "slash")}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_FETCH_TOKEN}`,
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Dati ricevuti dall'API:", data);

				setTitle(data.title);
				setLayouts(data.layouts);
			} else {
				navigate("/home");
			}
		};

		fetchData();
	}, [pageId]);

	// Imposta il titolo della pagina
	document.title = title;

	return (
		<>
			<Hero />
			<Navbar />
			<div className="col-11 col-md-8 m-auto">
				{layouts.map((layout, index) => (
					<Layouts key={index} layout={layout} />
				))}
			</div>
		</>
	);
}
