import React, { useEffect, useState } from "react";
import style from "./GoogleForm.module.css";

const GoogleForm = () => {
	const [windowDimenion, detectHW] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};
	useEffect(() => {
		window.addEventListener("resize", detectSize);

		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimenion]);
	return (
		<div className={style.GoogleForm_Wrapper}>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSdkyuHbKdmmU7r5_jIMH_PVrmqRBDSoe3-d3J9JUA2ObVHeMw/viewform?embedded=true"
				width={windowDimenion.winWidth}
				height="1089"
				// frameborder="0"
				// marginheight="0"
				// marginwidth="0"
				title="Inquiry Form"
			>
				<h1>Loading</h1>
			</iframe>
		</div>
	);
};

export default GoogleForm;
