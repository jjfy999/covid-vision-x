import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Box,
    IconButton,
    CardMedia,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

type UserRole = "doctor" | "researcher";

interface UploadProps {
    onFileUpload: (file: File, patientName: string) => void;
    userRole: UserRole;
}

const UploadImage: React.FC<UploadProps> = ({ userRole }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [patientId, setPatientId] = useState("");
    //const [modelType, setModelType] = useState('');
    const [modelTypes, setModelTypes] = useState<
        Array<{ id: string; name: string }>
    >([]);
    const [selectModelType, setSelectModelType] = useState<string>("");
    useEffect(() => {
        if (userRole === "doctor") {
            const fetchModelTypes = async () => {
                try {
                    const response = await fetch(
                        "www.covidvisionsx.online/docListModels/"
                    );
                    const data = await response.json();
                    const modelTypes = data.keys.map(
                        (key: string, index: number) => ({
                            id: index.toString(),
                            name: key,
                        })
                    );
                    setModelTypes(modelTypes);
                } catch (error) {
                    console.error("Failed to fetch model types:", error);
                }
            };

            fetchModelTypes();
        }
    }, [userRole]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const handleUpload = async () => {
        if (selectedFile && patientId) {
            const formData = new FormData();
            formData.append("Id", patientId);
            formData.append("file", selectedFile);
            formData.append("model_path", selectModelType);

            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const response = await fetch(
                    "www.covidvisionsx.online/predictImage/",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status === 200) {
                    URL.revokeObjectURL(previewUrl!);
                    alert("Image uploaded and analysed successfully");
                }
            } catch (error) {
                console.error(
                    "There was a problem with the fetch operation: ",
                    error
                );
            }
        } else {
            alert("Please select a file and enter the name.");
        }
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setSelectModelType(event.target.value as string);
    };

    const handleUploadModel = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("model_name", patientId);
            formData.append("model", selectedFile);

            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const response = await fetch(
                    "www.covidvisionsx.online/researcherUploadModel/",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status === 200) {
                    URL.revokeObjectURL(previewUrl!);
                    alert("Model uploaded successfully");
                }
            } catch (error) {
                console.error(
                    "There was a problem with the fetch operation: ",
                    error
                );
            }
        }
    };

    const renderRoleSpecificUI = () => {
        switch (userRole) {
            case "doctor":
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Upload Patient X-Ray Image
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                p: 2,
                                border: "2px dashed #267b83",
                                borderRadius: "10px",
                                mb: 2,
                            }}
                        >
                            <IconButton
                                color="primary"
                                component="label"
                                sx={{ mb: 1 }}
                            >
                                <input
                                    hidden
                                    accept=".jpg, .png"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <UploadIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                            {previewUrl && (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: "100%",
                                        maxHeight: "100%",
                                        mb: 2,
                                    }}
                                    image={previewUrl}
                                    alt="Preview"
                                />
                            )}
                            <Typography variant="body2">
                                Upload Patient X-Ray Image
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                Supports: .jpg, .png
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            label="Patient Id"
                            variant="standard"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="xray-type-label">
                                Choose Model
                            </InputLabel>
                            <Select
                                native
                                labelId="xray-type-label"
                                id="xray-type-select"
                                value={selectModelType}
                                label="Model Type"
                                onChange={handleTypeChange}
                            >
                                {modelTypes.map((modelType) => (
                                    <option
                                        key={modelType.id}
                                        value={modelType.name}
                                    >
                                        {modelType.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            disabled={
                                !selectedFile ||
                                !patientId ||
                                !selectModelType ||
                                modelTypes.length === 0
                            }
                        >
                            Analyse
                        </Button>
                    </>
                );
            case "researcher":
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Upload Research X-Ray Model
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                p: 2,
                                border: "2px dashed #267b83",
                                borderRadius: "10px",
                                mb: 2,
                            }}
                        >
                            <IconButton
                                color="primary"
                                component="label"
                                sx={{ mb: 1 }}
                            >
                                <input
                                    hidden
                                    accept=".h5, .hdf5"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <UploadIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                            {previewUrl && (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: "100%",
                                        maxHeight: "100%",
                                        mb: 2,
                                    }}
                                    image={previewUrl}
                                    alt="Preview"
                                />
                            )}
                            <Typography variant="body2">
                                Upload Research X-Ray Model
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                Supports: .h5, .hdf5
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            label="Model Name"
                            variant="standard"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUploadModel}
                            disabled={!selectedFile || !patientId}
                        >
                            Submit
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card sx={{ maxWidth: 600, m: 4, p: 2, boxShadow: 3 }}>
            <CardContent>{renderRoleSpecificUI()}</CardContent>
        </Card>
    );
};

export default UploadImage;
