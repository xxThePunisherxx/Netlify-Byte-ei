import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Courses from "./Pages/Courses/Courses";
import Comming from "./Pages/CommingSoon/Comming";
import ClientsAll from "./Pages/Clients/ClientsAll";
import NotFound from "./Pages/NotFound/NotFound";
import Admin from "./Pages/Admin/Admin";
// import Test from "./Pages/TestPage/Test";
import IndividualCourse from "./Pages/IndividualCourse/IndividualCourse";
import ClientLayout from "./Components/ClientLayout/ClientLayout";
import AddCourse from "./Pages/Add courses/AddCourse";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import EnrollForm from "./Components/Enroll Form/EnrollForm";
import Updatecourse from "./Pages/Update course/UpdateCourse";
import AddCourseCate from "./Pages/Add Course Category/AddCourseCate";
import UpdateCourseCategory from "./Pages/Update course Category/UpdateCourseCategory";
import AdminCourseListPage from "./Pages/Admin Course Page/AdminCourseListPage";
import RequireAuth from "./Components/RequireAuth";
import Addadmin from "./Pages/Add admin/Addadmin";
import Team from "./Pages/Our Team/Team";
import Contact from "./Pages/Contact us/Contact";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import UpdateAdmin from "./Pages/Update Admin/UpdateAdmin";
import AddTestomonial from "./Pages/Add Testomonial/AddTestomonial";
import AboutUs from "./Pages/About Us/AboutUs";
import StudentProject from "./Pages/Student Project/StudentProject";
import UpdateTestomonial from "./Pages/UpdateTestomonial/UpdateTestomonial";
import AddTeam from "./Pages/AddTeam/AddTeam";
import UpdateTeam from "./Pages/UpdateTeam/UpdateTeam";
import InquireyForm from "./Components/Inquirey/InquireyForm";
import AddPlacementPartnet from "./Pages/AddPlacementPartner/AddPlacementPartnet";
import AdminTeamListPage from "./Pages/AdminTeamListPage/AdminTeamListPage";
import AddStudentProject from "./Pages/AddStudentProject/AddStudentProject";
import UpdateStudentProjects from "./Pages/UpdateStudentProjects/UpdateStudentProjects";
import InividualProjectDescription from "./Pages/InividualProjectDescription/InividualProjectDescription";
import UpdatePartner from "./Pages/UpdatePartner/UpdatePartner";
import SubmittedFormData from "./Pages/SubmittedFormData/SubmittedFormData";

function App() {
	return (
		<Routes>
			{/* -------------------------------These are unprotected routes ----------------------------------------------*/}
			<Route path="/" element={<ClientLayout />}>
				<Route path="/" element={<Homepage />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/enroll" element={<EnrollForm />} />
				<Route path="/team" element={<Team />} />
				<Route path="/aboutUS" element={<AboutUs />} />
				<Route path="contact" element={<Contact />} />
				<Route path="/gallery" element={<Comming />} />
				<Route path="/studentProjects" element={<StudentProject />} />
				<Route path="/allClients" element={<ClientsAll />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route path="/course-view/:courseID" element={<IndividualCourse />} />
				<Route path="/project-view/:projectID" element={<InividualProjectDescription />} />
				<Route path="/inquiry" element={<InquireyForm />} />
				<Route path="/enroll" element={<EnrollForm />} />
				<Route path="*" element={<NotFound />} />
				{/* <Route path="/test" element={<Test />} /> just for quick testing of page */}
			</Route>
			<Route>
				{/* ---------------------------------- These are protected routes ---------------------------------------*/}
				{/* ---------------------------- both admin and super-admin can access these routes ------------------------------*/}
				<Route path="/adminLogin" element={<Admin />} />
				<Route element={<RequireAuth allowedRoles={["superAdmin", "admin"]} />}>
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="addCourse" element={<AddCourse />} />
						<Route path="updateCourse/:courseID" element={<Updatecourse />} />
						<Route path="updateCourseCategory/:categoryID" element={<UpdateCourseCategory />} />
						<Route path="updateTestomonial/:testomonialID" element={<UpdateTestomonial />} />
						<Route path="updateTeam/:teamID" element={<UpdateTeam />} />
						<Route path="updateStudentProject/:projectID" element={<UpdateStudentProjects />} />
						<Route path="updatePartner/:partnerID" element={<UpdatePartner />} />
						<Route path="dashboard" element={<AdminDashboard />} />
						<Route path="addCategory" element={<AddCourseCate />} />
						<Route path="allCourse" element={<AdminCourseListPage />} />
						<Route path="allTeam" element={<AdminTeamListPage />} />
						<Route path="addTestomonial" element={<AddTestomonial />} />
						<Route path="addTeam" element={<AddTeam />} />
						<Route path="addPlacementPartner" element={<AddPlacementPartnet />} />
						<Route path="addStudentProject" element={<AddStudentProject />} />
						<Route path="formData" element={<SubmittedFormData />} />
					</Route>
				</Route>
				{/* -----------------------------only super-admin can access these routes ------------------------------- */}
				<Route element={<RequireAuth allowedRoles={["superAdmin"]} />}>
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="addAdmin" element={<Addadmin />} />
						<Route path="updateUser/:adminID" element={<UpdateAdmin />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
