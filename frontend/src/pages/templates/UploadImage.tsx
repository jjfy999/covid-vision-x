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
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { SelectChangeEvent } from "@mui/material";

type UserRole = "doctor" | "researcher";

interface UploadProps {
    onFileUpload: (file: File, patientName: string) => void;
    userRole: UserRole;
}

const UploadImage: React.FC<UploadProps> = ({ onFileUpload, userRole }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [patientName, setPatientName] = useState("");
    //const [modelType, setModelType] = useState('');
    const [modelTypes, setModelTypes] = useState<
        Array<{ id: string; name: string }>
    >([]);
    const [selectModelType, setSelectModelType] = useState<string>("");

    useEffect(() => {
        const fetchModelTypes = async () => {
            try {
                const response = await fetch("baseUrl/docListModels/");
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
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (selectedFile && patientName) {
            onFileUpload(selectedFile, patientName);
            URL.revokeObjectURL(previewUrl!);
        } else {
            alert("Please select a file and enter the name.");
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectModelType(event.target.value as string);
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
                            label="Patient Name"
                            variant="standard"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="xray-type-label">
                                Choose Model
                            </InputLabel>
                            <Select
                                labelId="xray-type-label"
                                id="xray-type-select"
                                value={selectModelType}
                                label="Model Type"
                                onChange={handleTypeChange}
                            >
                                {modelTypes.map((modelType) => (
                                    <MenuItem
                                        key={modelType.id}
                                        value={modelType.id}
                                    >
                                        {modelType.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            disabled={
                                !selectedFile ||
                                !patientName ||
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
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            disabled={!selectedFile || !patientName}
                        >
                            Analyse
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
