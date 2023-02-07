import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Carousel.module.css";

function Carousel({ images, EnableautoPlay, ShowItemFor }) {
	const [current, setCurrent] = useState(0);
	const [autoPlay, setAutoPlay] = useState(EnableautoPlay);

	let timeOut = null;

	useEffect(() => {
		timeOut =
			// eslint-disable-next-line react-hooks/exhaustive-deps
			autoPlay &&
			setTimeout(() => {
				slideRight();
			}, ShowItemFor);
	});

	const slideRight = () => {
		setCurrent(current === images.length - 1 ? 0 : current + 1);
	};

	const slideLeft = () => {
		setCurrent(current === 0 ? images.length - 1 : current - 1);
	};

	return (
		<div
			className={style.carousel}
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
		>
			<div className={style.carouselWrapper}>
				{/* {console.log(images)} */}
				{images.map((image, index) => {
					return (
						<>
							<Link to={image.Link}>
								<div key={index} className={index === current ? "carousel_card carousel_card-active" : "carousel_card"}>
									<img className={style.cardImage} src={image.image} alt="" />
									<div className={style.cardOverlay}>
										<h2 className={style.cardTitle}>{image.title}</h2>
									</div>
									{/* <h1 className={style.bottomtext}>{image.title}</h1>//FIXME: */}
								</div>
							</Link>
						</>
					);
				})}
				<div className={style.carouselArrowLeft} onClick={slideLeft}>
					<h1>&lsaquo;</h1>
				</div>
				<div className={style.carouselArrowRight} onClick={slideRight}>
					<h1>&rsaquo;</h1>
				</div>
				<div className={style.carouselPagination}>
					{images.map((_, index) => {
						return (
							<div
								key={index}
								className={index === current ? "pagination_dot pagination_dot-active" : "pagination_dot"}
								onClick={() => setCurrent(index)}
							></div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Carousel;
