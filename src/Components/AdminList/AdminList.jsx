import React from "react";
import style from "./AdminList.module.css";
import { AdminListData } from "../../Data/AdminList";
import { MdModeEditOutline, MdDeleteSweep } from "react-icons/md";

const AdminList = () => {
	return (
		<div>
			<div className={style.allAdminWrapper}>
				<h1>Admin list</h1>
				<div className={style.allAdminGrid}>
					{AdminListData.map((Admin) => (
						<div key={Admin.image} className={style.admin_Table}>
							<img src={Admin.image} alt={Admin.Name}></img>
							<h1>{Admin.Name}</h1>
							<h1>{Admin.Role}</h1>
							<h1>{Admin.contact}</h1>
							<button className={style.Edit_Btn}>
								<MdModeEditOutline />
							</button>
							<button className={style.Delete_Btn}>
								<MdDeleteSweep />
							</button>
						</div>
					))}
					<button className={style.new}>Add admin</button>
				</div>
			</div>
		</div>
	);
};

export default AdminList;
