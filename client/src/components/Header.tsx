import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import { clearLocalStorage, getProfilePic, getUserName } from "../helpers/common";

const Header: React.FC = () => {
    const name = getUserName();
    const navigate = useNavigate();
    const profilePicURL = getProfilePic();

    const handleLogout = () => {
        clearLocalStorage();
        navigate("/");
    };

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Avatar
                    src={profilePicURL ?? ""}
                    alt={name ?? "no image"}
                />
                <Typography variant="h6" sx={{ flexGrow: 1, padding: 1 }}>
                    {name?.toUpperCase()}
                </Typography>
                <Button 
                    color="inherit" 
                    onClick={handleEditProfile}
                    sx={{ marginRight: 2 }}
                >
                    Edit Profile
                </Button>
                <IconButton color="inherit" onClick={handleLogout}>
                    <img src={logout} alt="Logout" style={{ width: 24, height: 24 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
