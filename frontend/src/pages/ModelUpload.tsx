import Header from "./templates/Header";
import UploadImage from "./templates/UploadImage";

const ModelUpload = () => {
    return (
        <>
            <Header userRole="researcher" />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 150px)",
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
            ;
        </>
    );
};

export default ModelUpload;
