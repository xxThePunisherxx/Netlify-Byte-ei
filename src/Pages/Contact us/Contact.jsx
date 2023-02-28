import React from "react";
import { useRef, useEffect, useState } from "react";

import style from "./Contact.module.css";

const Contact = () => {
	const EnrollRef = useRef();

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

	const handlesubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());

		console.log(enterdData);
	};
	useEffect(() => {
		EnrollRef.current.focus();
	}, []);

	return (
		<div className={style.Contact_Wrapper}>
			<div className={style.message_Wrapper}>
				<div className={style.message_heading}>
					<h1>
						We are eager to hear <br />
						<span className={style.HeadingHighlight}> from you.</span>
					</h1>
					<h2>We want to hear form you. Let us know how we can help.</h2>
				</div>
				<form onSubmit={handlesubmit} autoComplete="off" className={style.Enrorll_FormWrappper}>
					<h1>
						Legal Name
						<span className={style.mandatory_hightlight}>
							<sup>*&nbsp;</sup>
						</span>
					</h1>
					<input name="Full name" type="text" required ref={EnrollRef}></input>
					<h1>
						Email
						<span className={style.mandatory_hightlight}>
							<sup>*&nbsp;</sup>
						</span>
					</h1>
					<input name="Email" type="email" required></input>
					<h1>
						Mobile
						<span className={style.mandatory_hightlight}>
							<sup>*&nbsp;</sup>
						</span>
					</h1>
					<input name="mobile number" type="text" required></input>

					<h1>
						Message
						<span className={style.mandatory_hightlight}>
							<sup>*&nbsp;</sup>
						</span>
					</h1>
					<textarea name="Message" type="text" rows={10} required></textarea>
					<button className={style.Spantwo}>Submit</button>
				</form>
			</div>

			{/* <div className={style.FAQ_Wrapper}>
				<div className={style.FAQ_header}>
					<h1>
						Some <span className={style.HeadingHighlight}>FAQs</span>
					</h1>
					<div className={style.FAQ_lists}>
						<div className={style.Individual_FAQ}>
							<details>
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
						<div className={style.Individual_FAQ}>
							<details>
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab? </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
						<div className={style.Individual_FAQ}>
							<details>
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab? </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Contact;
