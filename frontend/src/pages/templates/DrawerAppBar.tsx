import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

/* interface Props {
    window?: () => Window;
} 

export default function DrawerAppBar(props: Props)
*/

export default function DrawerAppBar() {
    //const [patientMenuAnchorEl, setPatientMenuAnchorEl] = useState<null | HTMLElement>(null);
    //const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);

    // const handlePatientMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setPatientMenuAnchorEl(event.currentTarget);
    // };

    // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setProfileMenuAnchorEl(event.currentTarget);
    // };

    // const handleMenuClose = () => {
    //     setPatientMenuAnchorEl(null);
    //     setProfileMenuAnchorEl(null);
    // };

    const [patientMenuAnchorEl, setPatientMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const openPatient = Boolean(patientMenuAnchorEl);
    const handlePatientClick = (event: React.MouseEvent<HTMLElement>) => {
        setPatientMenuAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setPatientMenuAnchorEl(null);
        setProfileMenuAnchorEl(null);
    };

    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const openProfile = Boolean(profileMenuAnchorEl);
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor: '#267b83', padding: '8px 0' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        COVID VISION X
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            sx={{
                                color: '#fff',
                                backgroundColor: '#ecbb50d7',
                                fontSize: '1rem',
                                padding: '6px 12px',
                                '&:hover': { backgroundColor: '#b2a434' },
                            }}
                            // onMouseOver={handlePatientMenuOpen}
                            id="patient-button"
                            aria-controls={openPatient ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openPatient ? 'true' : undefined}
                            onClick={handlePatientClick}
                        >
                            Patient
                        </Button>
                        <Menu
                            id="patient-menu"
                            // anchorEl={patientMenuAnchorEl}
                            // open={Boolean(patientMenuAnchorEl)}
                            // onClose={handleMenuClose}
                            // MenuListProps={{ onMouseLeave: handleMenuClose }}
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={patientMenuAnchorEl}
                            open={Boolean(patientMenuAnchorEl)}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{ mt: '45px' }}
                        >
                            <MenuItem onClick={() => window.open('https://www.google.com', '_blank')}>Upload X-Ray Image</MenuItem>
                            <MenuItem onClick={() => window.open('https://www.fb.com', '_blank')}>Report</MenuItem>
                            <MenuItem onClick={() => window.open('https://www.twitter.com', '_blank')}>Non-Uploaded Report</MenuItem>
                        </Menu>

                        <div style={{ width: '100px' }}></div>

                        <Button
                            sx={{
                                color: '#fff',
                                backgroundColor: '#ecbb50d7',
                                fontSize: '1rem',
                                padding: '6px 12px',
                                '&:hover': { backgroundColor: '#b2a434' },
                            }}
                            id="profile-button"
                            aria-controls={openProfile ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openProfile ? 'true' : undefined}
                            onClick={handleProfileClick}
                        >
                            Profile
                        </Button>
                        <Menu
                            id="profile-menu"
                            // anchorEl={profileMenuAnchorEl}
                            // open={Boolean(profileMenuAnchorEl)}
                            // onClose={handleMenuClose}
                            // MenuListProps={{ onMouseLeave: handleMenuClose }}
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={profileMenuAnchorEl}
                            open={Boolean(profileMenuAnchorEl)}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{ mt: '45px' }}
                        >
                            <MenuItem onClick={() => window.open('https://www.yahoo.com', '_blank')}>View Profile</MenuItem>
                            <MenuItem onClick={() => window.open('https://www.apple.com', '_blank')}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
