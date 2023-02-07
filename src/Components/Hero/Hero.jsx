import React from "react";
import style from "./Hero.module.css";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import { ImageList } from "../../Data/Carousel";

const Hero = () => {
	return (
		// <div className={style.Home_Container}>
		<div className={style.Hero_Container}>
			<div className={style.Hero}>
				<div className={style.left}>
					<h1>Improve your skills faster</h1>
					<h2>Speed up the skill aquisition procress by finding courses that matches your niche.</h2>
					<Link to={"/enroll"}>
						<button>Enroll now</button>
					</Link>
				</div>
				<div className={style.mid}>
					<Carousel images={ImageList} EnableautoPlay={true} ShowItemFor={8000} />
				</div>
			</div>
		</div>
		// </div>
	);
};

export default Hero;
