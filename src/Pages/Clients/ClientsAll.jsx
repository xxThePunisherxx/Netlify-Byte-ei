import React from "react";
import style from "./ClientsAll.module.css";
import useFetch from "../../Utils/Hooks/fetch";

const ClientsAll = () => {
	const { data: ClientsData, ispending } = useFetch("https://byte-backend-demo.up.railway.app/api/partner");
	return (
		<div className={style.ClientsContainer}>
			<h1>
				Our <span className={style.HeadingHighlight}>Placement Partners</span>
			</h1>
			{!ispending && (
				<div className={style.ImagesGrid}>
					{ClientsData.partner.map((item) => (
						<a href={item.companyWebsite}>
							<img key={item._id} src={item.image} alt={item.link} />
						</a>
					))}
				</div>
			)}
		</div>
	);
};

export default ClientsAll;
