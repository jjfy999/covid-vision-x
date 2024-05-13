import UploadImage from "./templates/UploadImage";
import Header from "./templates/Header";

const App = () => {
    return (
        <>
            <Header userRole="doctor" />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 450px)",
                    marginTop: "300px",
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
                        userRole="doctor"
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
