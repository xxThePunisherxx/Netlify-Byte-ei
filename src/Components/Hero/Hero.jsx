import React from "react";
import style from "./Hero.module.css";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import useFetch from "../../Utils/Hooks/fetch";

const Hero = () => {
	const { data: trainingData, ispending } = useFetch("https://learning-management-system-kx6y.onrender.com/api/training");
	const filteredData = trainingData.training.filter((Individual) => Individual.priority < 8);
	console.log(filteredData);

	return (
		<div className={style.Hero_Container}>
			<div className={style.Hero}>
				<div className={style.left}>
					<h1>Improve your skills faster</h1>
					<h2>Speed up the skill aquisition procress by finding courses that matches your niche.</h2>
					<button>
						<Link to={"/enroll"}>Enroll now</Link>
					</button>
				</div>
				<div className={style.mid}>
					{ispending && (
						<div className="loader">
							<div className="scanner">
								<span>Loading...</span>
							</div>
						</div>
					)}
					{!ispending && <Carousel images={filteredData} EnableautoPlay={false} ShowItemFor={8000} />}
				</div>
			</div>
		</div>
	);
};

export default Hero;
