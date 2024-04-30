import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProfileProps {
    doctorId: string;
    name: string;
    specialty: string;
    yearsOfExperience: number;
    contactNumber: string;
    email: string;
}

const ProfileCard: React.FC<ProfileProps> = ({ doctorId, name, specialty, yearsOfExperience, contactNumber, email }) => {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, m: 2 }}>
            <CardMedia>
                <AccountCircleIcon sx={{ fontSize: 100, mt: 2, alignSelf: 'center' }} />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Doctor Profile
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Doctor ID:" secondary={doctorId} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Doctor Name:" secondary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Specialty:" secondary={specialty} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Years of Experience:" secondary={yearsOfExperience.toString()} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Contact Number:" secondary={contactNumber} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email:" secondary={email} />
                    </ListItem>
                </List>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Edit
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
