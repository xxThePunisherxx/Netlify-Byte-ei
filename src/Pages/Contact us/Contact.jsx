import React from "react";
import style from "./Contact.module.css";

const Contact = () => {
	const handleMessageSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		console.log(enterdData);
	};
	return (
		<div className={style.Contact_Wrapper}>
			<div className={style.message_Wrapper}>
				<div className={style.message_heading}>
					<h1>
						We've been waiting <br />
						<span className={style.HeadingHighlight}> for you.</span>
					</h1>
					<h2>We want to hear form you. Let us know how we can help.</h2>

					<form onSubmit={handleMessageSubmit} autoComplete="off" className={style.MessageForm}>
						<h2>Send us a Message</h2>
						<h1>Name</h1>
						<input name="message_Sender" type="text" required></input>
						<h1>Email</h1>
						<input name="message_Sender_Email" type="email" required></input>
						<h1>Contact number</h1>
						<input name="message_Sender_Contact" type="text" required></input>
						<h1>Message</h1>
						<textarea name="message_content" type="text"></textarea>
						<br />
						<button>Submit</button>
					</form>
				</div>
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
