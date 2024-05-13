import UploadImage from "./templates/UploadImage";
import Header from "./templates/Header";

const App = () => {
    return (
        <>
            <Header userRole="researcher" />

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
