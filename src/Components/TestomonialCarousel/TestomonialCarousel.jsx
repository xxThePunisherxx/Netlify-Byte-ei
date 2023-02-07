import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./TestomonialCarousel.module.css";

function TestomonialCarousel({ images, EnableautoPlay, ShowItemFor }) {
	const [current, setCurrent] = useState(0);
	const [autoPlay, setAutoPlay] = useState(EnableautoPlay);

	let timeOut = null;

	useEffect(() => {
		timeOut =
			// eslint-disable-next-line react-hooks/exhaustive-deps
			autoPlay &&
			setTimeout(() => {
				slideRight();
			}, 5000);
	});

	const slideRight = () => {
		setCurrent(current === images.length - 1 ? 0 : current + 1);
	};

	return (
		<div className={style.carousel}>
			<div
				onMouseEnter={() => {
					if (EnableautoPlay === true) {
						setAutoPlay(false);
						clearTimeout(timeOut);
					}
				}}
				onMouseLeave={() => {
					if (EnableautoPlay === true) {
						setAutoPlay(true);
					} else setAutoPlay(false);
				}}
				className={style.carouselWrapper}
			>
				{images.map((image, index) => {
					return (
						<Link to={image.Link}>
							<div className={index === current ? "Testicarousel_card Testicarousel_card-active" : "Testicarousel_card"}>
								<img className={style.cardImage} src={image.image} alt="" />

								<div className={style.cardText}>
									<h1>{image.Review}</h1>
									<h2>{image.Name}</h2>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
export default TestomonialCarousel;
