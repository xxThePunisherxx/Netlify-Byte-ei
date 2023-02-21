import React, { useEffect, useState } from "react";
import style from "./EnrollForm.module.css";

const EnrollForm = () => {
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
		<div className={style.EnrollForm_Wrapper}>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfZRh3op2X6QfI5K_FAks8ijn18R0_NoI45XOHohBYSET6cmA/viewform?embedded=true"
				width={windowDimenion.winWidth}
				height="1017"
				// frameBorder="0"
				// marginheight="0"
				// marginwidth="0"
				title="Enroll Form"
			>
				Loading
			</iframe>
		</div>
	);
};

export default EnrollForm;
