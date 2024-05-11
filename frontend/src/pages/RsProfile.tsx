import React from "react";
import ReactDOM from "react-dom";
import ProfileCard from "./templates/ProfileCard";
import DrawerAppBar from "./templates/DrawerAppBar";
import UploadImage from "./templates/UploadImage";
import NonUpdatedReport from "./templates/NonUpdatedReport";

const App = () => {
    return (
        <>
            <DrawerAppBar userRole="doctor" firstText="Patient" />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 450px)",
                    marginTop: "100px",
                }}
            >
                <div
                    style={{
                        flexShrink: 0,
                        width: "100%",
                        maxWidth: "600px",
                    }}
                >

                    <UploadImage
                        userRole="researcher"
                        onFileUpload={(file, patientName) => {
                            console.log(file, patientName);
                        }}
                    />
                </div>
            </div>



        </>
    );
};

export default App;
