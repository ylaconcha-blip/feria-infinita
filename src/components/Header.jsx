import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Cambiado de 'sm' a 'md' para incluir tablets

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar className="header" sx={{ justifyContent: 'space-between' }}>
                {/* Barras verticales */}
                <Box sx={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
                    <Box sx={{ width: 24, backgroundColor: '#B3D8E6' }} />
                    <Box sx={{ width: 24, backgroundColor: '#7BA6C9' }} />
                    <Box sx={{ width: 24, backgroundColor: '#5C8DB8' }} />
                </Box>
                <Typography variant="h1" color="inherit" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
                    La feria infinita
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            sx={{
                                padding: '8px',
                                marginLeft: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <MenuIcon sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#512876',
                                    color: 'white',
                                    minWidth: '150px'
                                }
                            }}
                        >
                            <MenuItem
                                onClick={handleMenuClose}
                                component={NavLink}
                                to="/"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Mapa
                            </MenuItem>
                            <MenuItem
                                onClick={handleMenuClose}
                                component={NavLink}
                                to="/proyecto"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                El proyecto
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box>
                        <Button
                            color="inherit"
                            size="large"
                            component={NavLink}
                            to="/"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            Mapa
                        </Button>
                        <Button
                            color="inherit"
                            size="large"
                            component={NavLink}
                            to="/proyecto"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            El proyecto
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;