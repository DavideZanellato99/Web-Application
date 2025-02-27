import { Routes, Route, Navigate } from "react-router-dom";
import Page from "./Page";

export default function App() {
	return (
		<Routes>
			<Route path="/*" element={<Page />} />
			<Route path="/" element={<Navigate to="/home" replace />} />
		</Routes>
	);
}
