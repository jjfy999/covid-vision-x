import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProfileProps {
    doctorId: string;
    name: string;
    contactNumber: string;
    email: string;
}

const ProfileCard: React.FC<ProfileProps> = ({ doctorId, name, contactNumber, email }) => {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, m: 2 }}>
            <CardMedia
                sx={{
                    display: 'flex', // Enable flexbox
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically (optional if you want it exactly in the middle of the space)
                    height: 140 // Set a specific height for the CardMedia container
                }}
            >
                <AccountCircleIcon sx={{ fontSize: 100, mt: 2 }} />
            </CardMedia>
            <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
                    Doctor Profile
                </Typography> */}
                <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
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
                        <ListItemText primary="Contact Number:" secondary={contactNumber} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email:" secondary={email} />
                    </ListItem>
                </List>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                    Edit
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
