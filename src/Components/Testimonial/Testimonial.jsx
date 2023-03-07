import React from "react";
import style from "./Testimonial.module.css";
import TestomonialCarousel from "../../Components/TestomonialCarousel/TestomonialCarousel";
import useFetch from "../../Utils/Hooks/fetch";

const Testimonial = () => {
	const { data: TestomonialServerResponse, ispending } = useFetch("https://byte-backend-demo.up.railway.app/api/testimonial");
	const Testominials = TestomonialServerResponse.testimonial;

	return (
		<div>
			<h1 className={style.MainHeading}>
				What our <span className={style.HeadingHighlight}>students say</span>
			</h1>

			<div>
				{ispending && (
					<div className={style.Skel}>
						<div className={style.imgDiv}></div>
					</div>
				)}
				{!ispending && <TestomonialCarousel images={Testominials} EnableautoPlay={true} ShowItemFor={5000} />}
			</div>
		</div>
	);
};

export default Testimonial;
