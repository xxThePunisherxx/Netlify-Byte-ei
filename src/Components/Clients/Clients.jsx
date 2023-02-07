import React from "react";
import style from "./Clients.module.css";
import { Link } from "react-router-dom";
import { ClientsData } from "../../Data/clients";

const Clients = () => {
	return (
		<div className={style.ClientsContainer}>
			<h1>
				Our <span className={style.HeadingHighlight}>Esteemed Clients</span>
			</h1>
			<div className={style.ImagesGrid}>
				{ClientsData.map((item) => (
					<img key={item.link} src={item.link} alt={item.link} />
				))}
			</div>
			<Link to={"/allClients"}>
				<button>View More</button>
			</Link>
		</div>
	);
};

export default Clients;
