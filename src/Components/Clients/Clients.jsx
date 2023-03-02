import React from "react";
import style from "./Clients.module.css";
import { Link } from "react-router-dom";
// import { ClientsData } from "../../Data/clients";
import useFetch from "../../Utils/Hooks/fetch";

const Clients = () => {
	const { data: ClientsData, ispending } = useFetch("https://learning-management-system-kx6y.onrender.com/api/partner");
	return (
		<div className={style.ClientsContainer}>
			<h1>
				Our <span className={style.HeadingHighlight}>Placement Partners</span>
			</h1>
			{!ispending && (
				<div className={style.ImagesGrid}>
					{ClientsData.partner.slice(0, 5).map((item) => (
						<a href={item.companyWebsite}>
							<img key={item._id} src={item.image} alt={item.link} />
						</a>
					))}
				</div>
			)}
			<Link to={"/allClients"}>
				<button>View More</button>
			</Link>
		</div>
	);
};

export default Clients;
