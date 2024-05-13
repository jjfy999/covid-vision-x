import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
    Box,
    Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    boxShadow: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.2)",
    fontFamily: "'Joan', serif",
    margin: theme.spacing(2),
}));

const Image = styled("img")({
    width: "100%",
    height: "auto",
    marginBottom: "20px",
});

const CustomButton = styled(Button)({
    margin: "10px",
    "&.deleteButton": {
        backgroundColor: "#ff0000",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#e60000",
        },
    },
    "&.uploadButton": {
        backgroundColor: "#007FFF", // MUI default blue
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#0059b2",
        },
    },
});

interface ReportData {
    patient_name: string;
    date: string;
    image: string;
    status: string;
}

const NonUpdatedReport: React.FC<ReportData> = (ReportData) => {
    const [reportData, setReportData] = useState<ReportData>({
        patient_name: "John Doe",
        date: "2024-03-23",
        image: "path_to_xray_image.png",
        status: "covid", // Default status
    });

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch("https://api.example.com/report");
                const data = await response.json();
                setReportData(data);
            } catch (error) {
                console.error("Failed to fetch report data:", error);
            }
        };

        fetchReportData();
    }, []);

    const handleStatusChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setReportData((prev) => ({
            ...prev,
            status: event.target.value as string,
        }));
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CustomCard>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            X-Ray
                        </Typography>
                        <Image src={ReportData.image} alt="X-ray" />
                        <Typography variant="body1">
                            NAME: {ReportData.patient_name}
                        </Typography>
                        <Typography variant="body1">
                            DATE: {ReportData.date}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                        >
                            Detailed Report Information
                        </Typography>
                        <Typography variant="body2">Result</Typography>
                        <FormControl fullWidth margin="normal">
                            <Select
                                value={ReportData.status}
                                onChange={handleStatusChange}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="covid">Covid</MenuItem>
                                <MenuItem value="normal">Normal</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="space-between">
                            <CustomButton
                                className="deleteButton"
                                variant="contained"
                            >
                                Delete
                            </CustomButton>
                            <CustomButton
                                className="uploadButton"
                                variant="contained"
                            >
                                Upload
                            </CustomButton>
                        </Box>
                    </CardContent>
                </CustomCard>
            </Box>
        </Container>
    );
};

export default NonUpdatedReport;
