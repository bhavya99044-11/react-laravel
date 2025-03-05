import { Avatar, FormHelperText, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
const Login = () => {
    const Item = styled(Paper)(({ theme }) => ({
        textAlign: 'left',
    }));

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const validateEmail = () => {
        return email.length > 0;
    }
    
    const submitForm = (e) => {
        e.preventDefault();
        setErrors({
            email: "",
            password: ""
        })
        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }))
        }
        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }))
        }
        if (validateEmail(email)) {
           loginUser();
        }
    }

    const loginUser=async()=>{
        try{
            const response=await axios.post(`${import.meta.env.VITE_API_URL}login`,{
                email,
                password
            })
            console.log(response)
        }catch(error){
            // console.error(error)
            return;
            // throw error.response; // Throw the error response for handling
        }
    }   
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{
                mt: 8, p: 2, pb: 10,
            }}>
                <Avatar sx={{
                    mx: 'auto',
                    bgcolor: 'grey',
                    mb: 1,
                    textAlign: 'center'
                }}>
                    <FaLock />
                </Avatar>
                <Typography component="h2" variant="h6" >Login here</Typography>
                <Box mt={2} component="form" onSubmit={submitForm}>
                    <TextField
                        placeholder="Enter email"
                        fullWidth={true}
                        sx={{
                        }}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></TextField>
                    <FormHelperText sx={{ color: 'red', h: 2, mb: 2 }}>
                        {errors.email}
                    </FormHelperText>
                    <TextField
                        placeholder="Enter password"
                        fullWidth={true}
                        mb={2}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></TextField>
                    <FormHelperText sx={{ color: 'red', h: 2, mb: 2 }}>
                        {errors.password}
                    </FormHelperText>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        variant="contained"
                        sx={{
                            justifyContent: 'flex-start',
                            ml: 0,
                            width: '100%',
                        }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} >Login</Button>
                </Box>
                <Grid container mt={2} justifyContent='space-between'>
                    <Grid>
                        <RouteLink to="/forgot-password" className="link" >Forgot password</RouteLink>
                    </Grid>
                    <Grid>
                        <RouteLink to="/register" className="link" >Register here</RouteLink>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Login;