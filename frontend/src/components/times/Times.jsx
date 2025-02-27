import React from "react";
import "./Times.css";

export default function Times({ value, tableTimes }) {
	return (
		<div className="times px-3 mb-4 mt-4" tabIndex="0">
			<h5>{value}</h5>
			<div className="d-flex justify-content-center align-items-center">
				<table className="col-10 col-sm-4 table rounded">
					<tbody>
						{tableTimes.map((time, index) => (
							<tr key={index}>
								<td>{time.day}</td>
								<td>
									{time.startTime}{" "}
									{time.endTime ? ` - ${time.endTime}` : ""}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
