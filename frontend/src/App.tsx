import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Report from "./pages/Report";
import PatientProfile from "./pages/PatientProfile";
import LoginPage from "./pages/LoginPage";
// import PatientEditProfile from "./pages/PatientEditProfile";
import UserAccount from "./pages/UserAcc";
import AccountDetails from "./pages/AccDetail";
// import EditAccountDetails from "./pages/EditAcc";
import SysadProfile from "./pages/SysAdProfile";
// import SysadEditProfile from "./pages/SysAdEditProfile";
import PrivateRoute from "./pages/templates/PrivateRoute";
import { AuthProvider } from "./pages/templates/AuthContexr";
import RoleRoute from "./pages/templates/RoleRoute";
import DoctorProfile from "./pages/DoctorProfile";
import RsProfile from "./pages/RsProfile";
import ErrorPage from "./pages/ErrorPage";
import CreateUser from "./pages/CreateUser";
import DoctorReport from "./pages/DoctorReport";
import DoctorUploadImage from "./pages/DoctorUploadImage";
import DNUR from "./pages/DoctorNonUpdatedReport";
import Model from "./pages/Model";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/HomPage" element={<HomePage />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route element={<RoleRoute requiredRole={"doctor"} />}>
                    <Route path="/doctorprofile" element={<DoctorProfile />} />
                    <Route path="/DoctorReport" element={<DoctorReport />} />
                    <Route path="/DoctorNonUpdatedReport" element={<DNUR />} />
                    <Route
                        path="/DoctorUploadImage"
                        element={<DoctorUploadImage />}
                    />
                </Route>
                <Route element={<RoleRoute requiredRole={"researcher"} />}>
                    <Route path="/Rsprofile" element={<RsProfile />} />
                    <Route path="/model" element={<Model />} />
                </Route>
                <Route element={<RoleRoute requiredRole={"patient"} />}>
                    <Route path="/report" element={<Report />} />
                    <Route
                        path="/PatientProfile"
                        element={<PatientProfile />}
                    />
                    {/* <Route path="/patientEditProfile" element={<PatientEditProfile />} /> */}
                </Route>
                <Route element={<RoleRoute requiredRole={"system_admin"} />}>
                    <Route path="/UserAcc" element={<UserAccount />} />
                    <Route
                        path="/AccDetail/:userId"
                        element={<AccountDetails />}
                    />
                    {/* <Route path="/EditAcc/:userId" element={<EditAccountDetails />} /> */}
                    <Route path="/SysAdProfile" element={<SysadProfile />} />
                    {/* <Route path="/SysAdEditProfile" element={<SysadEditProfile />} /> */}
                    <Route path="/CreateUser" element={<CreateUser />} />
                </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
