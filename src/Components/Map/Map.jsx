import React from "react";
import style from "./Map.module.css";
import { useState, useEffect } from "react";

const Map = () => {
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
		<div className={style.mapWrapper}>
			<h1>
				Find <span className={style.highlight}>Us at</span>
			</h1>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1839486565073!2d-73.98773128426951!3d40.75797874273765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sne!2snp!4v1672838723746!5m2!1sne!2snp"
				width={windowDimenion.winWidth - 50}
				height="500"
				allowFullScreen=""
				title="Map location"
			></iframe>
		</div>
	);
};

export default Map;
