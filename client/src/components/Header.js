import React, { useState } from 'react';
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Header = () => {
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            alert('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <AppBar position='sticky' >
        <Toolbar> 
            <Typography variant='h4'>
            My Blog App
            </Typography>
            {isLogin && (
            <Box display={'flex'} marginLeft={'auto'}>
                <Tabs 
                textColor='inherit'
                value={value}
                onChange={(e, val) => setValue(val)}
                >
                    <Tab label='Blogs' LinkComponent={Link} to="/blogs"/>
                    <Tab label='My Blogs' LinkComponent={Link} to="/my-blogs"/>
                    <Tab label='Create Blog' LinkComponent={Link} to="/create-blog"/>
                </Tabs>
            </Box>
            )}
            <Box display={'flex'} marginLeft={'auto'}>
                {!isLogin && (
                    <>
                        <Button sx={{margin:1, color:"white"}} LinkComponent={Link} to='/login'>Login</Button>
                        <Button sx={{margin:1, color:"white"}} LinkComponent={Link} to='/register'>Register</Button>
                    </>
                )}
                {isLogin &&(
                    <Button onClick={handleLogout} sx={{margin:1, color:"white"}} LinkComponent={Link} to='/logout'>Logout</Button>
                )}
            </Box>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header;