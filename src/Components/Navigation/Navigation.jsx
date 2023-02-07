import React, { useEffect, useRef, useState } from "react";
import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { Links } from "../../Data/Navlink";
import Logo from "../../assets/Logo.png";

const Navigation = () => {
	const [Navtogled, setNavtogled] = useState(false);
	useEffect(() => {
		let handler = (event) => {
			if (!navRef.current.contains(event.target)) {
				setNavtogled(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	let navRef = useRef();
	return (
		<div>
			<header className={style.header} ref={navRef}>
				<div className={style.Navigation_Container}>
					<div className={style.Links}>
						<a href="/" className={style.logo}>
							<div className={style.headerrlogo}>
								<img src={Logo} alt="" />
							</div>
						</a>
						<input type="checkbox" id={style.navCheck} onClick={() => setNavtogled((Navtogled) => !Navtogled)} checked={Navtogled} readOnly></input>
						<label htmlFor={style.navCheck} className={style.navToggler}>
							<span></span>
						</label>
						<nav className={style.nav}>
							<ul>
								{Links.map((Link) => (
									<li key={Link.Key}>
										<NavLink
											onClick={() => setNavtogled((Navtogled) => !Navtogled)}
											to={Link.Linkto}
											className={({ isActive }) => {
												return "Link_Text_" + (isActive ? "Active" : "Unactive");
												// css properties are in App.css
											}}
										>
											{Link.LinkName}
										</NavLink>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navigation;
