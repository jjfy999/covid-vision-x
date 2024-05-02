import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, IconButton, CardMedia } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

interface UploadProps {
    onFileUpload: (file: File, patientName: string) => void; // Function to handle the file upload
}

const UploadImage: React.FC<UploadProps> = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [patientName, setPatientName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file for preview
        }
    };

    const handleUpload = () => {
        if (selectedFile && patientName) {
            onFileUpload(selectedFile, patientName);
            URL.revokeObjectURL(previewUrl!); // Clean up the object URL
        } else {
            alert('Please select a file and enter the patient name.');
        }
    };

    return (
        <Card sx={{ maxWidth: 600, m: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Upload X-Ray Image
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2,
                    border: '2px dashed #267b83',
                    borderRadius: '10px',
                    mb: 2
                }}>
                    <IconButton color="primary" component="label" sx={{ mb: 1 }}>
                        <input hidden accept=".jpg, .png, .pdf" type="file" onChange={handleFileChange} />
                        <UploadIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    {previewUrl && (
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', maxHeight: "100%", mb: 2 }}
                            image={previewUrl}
                            alt="Preview"
                        />
                    )}
                    <Typography variant="body2">
                        Upload Patient X-Ray Image
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Supports: .jpg, .png,
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile || !patientName}
                >
                    Analyse
                </Button>
            </CardContent>
        </Card>
    );
};

export default UploadImage;
