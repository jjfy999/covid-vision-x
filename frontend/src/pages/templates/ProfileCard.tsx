import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia, List, ListItem, TextField, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProfileProps {
    doctorId: string;
    name: string;
    contactNumber: string;
    email: string;
}

const ProfileCard: React.FC<ProfileProps> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({ ...props });

    const handleChange = (prop: keyof typeof profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [prop]: event.target.value });
    };

    const handleCancel = () => {
        setProfile({ ...props }); // Revert to original props
        setEditMode(false);
    };

    const handleSave = () => {
        // In a real application, you might also want to send these updates back to a server here
        setEditMode(false);
    };

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, m: 2 }}>
            <CardMedia
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 140
                }}
            >
                <AccountCircleIcon sx={{ fontSize: 100, mt: 2 }} />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
                    Doctor Profile
                </Typography>
                <List>
                    {editMode ? (
                        <>
                            <ListItem>
                                <TextField label="Doctor ID" variant="outlined" fullWidth value={profile.doctorId} onChange={handleChange('doctorId')} />
                            </ListItem>
                            <ListItem>
                                <TextField label="Doctor Name" variant="outlined" fullWidth value={profile.name} onChange={handleChange('name')} />
                            </ListItem>
                            <ListItem>
                                <TextField label="Contact Number" variant="outlined" fullWidth value={profile.contactNumber} onChange={handleChange('contactNumber')} />
                            </ListItem>
                            <ListItem>
                                <TextField label="Email" variant="outlined" fullWidth value={profile.email} onChange={handleChange('email')} />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <ListItemText primary="Doctor ID:" secondary={profile.doctorId} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Doctor Name:" secondary={profile.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Contact Number:" secondary={profile.contactNumber} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email:" secondary={profile.email} />
                            </ListItem>
                        </>
                    )}
                </List>
                {editMode ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="outlined" color="error" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileCard;






//old below

// import React from 'react';
// import { Card, CardContent, Typography, Button, CardMedia, List, ListItem, ListItemText } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// interface ProfileProps {
//     doctorId: string;
//     name: string;
//     contactNumber: string;
//     email: string;
// }

// const ProfileCard: React.FC<ProfileProps> = ({ doctorId, name, contactNumber, email }) => {
//     return (
//         <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, m: 2 }}>
//             <CardMedia
//                 sx={{
//                     display: 'flex', // Enable flexbox
//                     justifyContent: 'center', // Center horizontally
//                     alignItems: 'center', // Center vertically (optional if you want it exactly in the middle of the space)
//                     height: 140 // Set a specific height for the CardMedia container
//                 }}
//             >
//                 <AccountCircleIcon sx={{ fontSize: 100, mt: 2 }} />
//             </CardMedia>
//             <CardContent>
//                 {/* <Typography gutterBottom variant="h5" component="div">
//                     Doctor Profile
//                 </Typography> */}
//                 <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
//                     Doctor Profile
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <ListItemText primary="Doctor ID:" secondary={doctorId} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Doctor Name:" secondary={name} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Contact Number:" secondary={contactNumber} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Email:" secondary={email} />
//                     </ListItem>
//                 </List>
//                 <Button variant="contained" color="primary" sx={{ mt: 1 }}>
//                     Edit
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProfileCard;
