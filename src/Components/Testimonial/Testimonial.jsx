import React from "react";
import style from "./Testimonial.module.css";
// import { Testomonials } from "../../Data/Testimonial";
// import Carousel from "../Carousel/Carousel";
import TestomonialCarousel from "../../Components/TestomonialCarousel/TestomonialCarousel";
import { Testomonials } from "../../Data/Testimonial";

// asdasd

const Testimonial = () => {
	return (
		<div>
			<h1 className={style.MainHeading}>
				What our <span className={style.HeadingHighlight}>students say</span>
			</h1>
			<div>
				<TestomonialCarousel images={Testomonials} EnableautoPlay={true} ShowItemFor={5000} />
			</div>
		</div>
	);
};

export default Testimonial;
