import React, { useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";

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
    id: string;
    patient_name: string;
    date: string;
    image: string;
    status: string;
    approved: boolean;
}

const NonUpdatedReport: React.FC<ReportData> = (ReportData) => {
    const { id } = useParams();
    const [overwrite, setOverwrite] = useState(ReportData.status);
    const navigate = useNavigate();

    const handleStatusChange = (event) => {
        setOverwrite(event.target.value as string);
    };

    const handleDelete = async () => {
        try {
            const tokens = JSON.parse(
                localStorage.getItem("authTokens") || "{}"
            );
            const token = tokens.access;
            const res = await fetch(`/baseUrl/deleteReport/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (!res.ok) {
                throw new Error("http error: status " + res.status);
            }
            console.log("Report deleted successfully");
            navigate("/DoctorNonUpdatedReport", { replace: true });
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    };

    const handleUpload = async (newStatus: string) => {
        try {
            const tokens = JSON.parse(
                localStorage.getItem("authTokens") || "{}"
            );
            const token = tokens.access;
            const res = await fetch(`/baseUrl/uploadReport/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    report_id: id,
                    status: newStatus,
                }),
            });
            if (!res.ok) {
                throw new Error("http error: status " + res.status);
            }
            navigate("/DoctorNonUpdatedReport", { replace: true });
        } catch (error) {
            console.error("Error uploading report:", error);
        }
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
                            PATIENT ID: {ReportData.id}
                        </Typography>
                        <Typography variant="body1">
                            NAME: {ReportData.patient_name}
                        </Typography>
                        <Typography variant="body1">
                            DATE: {ReportData.date}
                        </Typography>
                        <Typography variant="body1">
                            STATUS: {ReportData.status}
                        </Typography>
                        {!ReportData.approved && (
                            <>
                                <Typography variant="body2">result</Typography>
                                <FormControl fullWidth margin="normal">
                                    <Select
                                        value={overwrite}
                                        onChange={handleStatusChange}
                                        displayEmpty
                                        inputProps={{
                                            "aria-label": "Without label",
                                        }}
                                    >
                                        <MenuItem value="Covid">Covid</MenuItem>
                                        <MenuItem value="Normal">
                                            Normal
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <CustomButton
                                        className="deleteButton"
                                        variant="contained"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </CustomButton>
                                    <CustomButton
                                        className="uploadButton"
                                        variant="contained"
                                        onClick={() => handleUpload(overwrite)}
                                    >
                                        Upload
                                    </CustomButton>
                                </Box>
                            </>
                        )}
                    </CardContent>
                </CustomCard>
            </Box>
        </Container>
    );
};

export default NonUpdatedReport;
