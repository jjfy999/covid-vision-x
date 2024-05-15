import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Report from "./pages/Report";
import PatientProfile from "./pages/PatientProfile";
import LoginPage from "./pages/LoginPage";
import UserAccount from "./pages/UserAcc";
import AccountDetails from "./pages/AccDetail";
import SysadProfile from "./pages/SysAdProfile";
import PrivateRoute from "./pages/templates/PrivateRoute";
import { AuthProvider } from "./pages/templates/AuthContexr";
import RoleRoute from "./pages/templates/RoleRoute";
import DoctorProfile from "./pages/DoctorProfile";
import RsProfile from "./pages/RsProfile";
import ErrorPage from "./pages/ErrorPage";
import CreateUser from "./pages/CreateUser";
import DoctorReport from "./pages/DoctorReport";
import DoctorUploadImage from "./pages/DoctorUploadImage";
import DoctorNUR from "./pages/DoctorNonUpdatedReport";
import Model from "./pages/Model";
import HomePage from "./pages/HomePage";
import ViewReportDetails from "./pages/doctorViewReports";
import PatientList from "./pages/PatientList";
import PatientReports from "./pages/PatientReports";
import ModelUpload from "./pages/ModelUpload";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/loginpage/" element={<LoginPage />} />
            <Route path="/HomePage/" element={<HomePage />} />
            <Route path="/AccDetail/:userId/" element={<AccountDetails />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route element={<RoleRoute requiredRole={"doctor"} />}>
                    <Route path="/doctorprofile/" element={<DoctorProfile />} />
                    <Route path="/DoctorReport/" element={<DoctorReport />} />
                    <Route
                        path="/DoctorNonUpdatedReport/"
                        element={<DoctorNUR />}
                    />
                    <Route
                        path="/reportDetails/:id/"
                        element={<ViewReportDetails />}
                    />
                    <Route
                        path="/DoctorUploadImage/"
                        element={<DoctorUploadImage />}
                    />
                    <Route path="/patientList/" element={<PatientList />} />
                </Route>
                <Route element={<RoleRoute requiredRole={"researcher"} />}>
                    <Route path="/Rsprofile/" element={<RsProfile />} />
                    <Route path="/model/" element={<Model />} />
                    <Route path="/ModelUpload/" element={<ModelUpload />} />
                </Route>
                <Route element={<RoleRoute requiredRole={"patient"} />}>
                    <Route path="/report/:id/" element={<Report />} />
                    <Route
                        path="/PatientProfile/"
                        element={<PatientProfile />}
                    />
                    <Route
                        path="/PatientReports/"
                        element={<PatientReports />}
                    />
                </Route>
                <Route element={<RoleRoute requiredRole={"system_admin"} />}>
                    <Route path="/UserAcc/" element={<UserAccount />} />
                    <Route path="/SysAdProfile/" element={<SysadProfile />} />
                    <Route path="/CreateUser/" element={<CreateUser />} />
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
