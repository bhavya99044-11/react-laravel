import { Avatar, FormHelperText, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import axios from "axios";
const Login = () => {
    const Item = styled(Paper)(({ theme }) => ({
        textAlign: 'left',
    }));

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")


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
            username:'',
            email: "",
            password: ""
        })
        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }))
        }
        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }))
        }
        if(!username){
            setErrors((prev) => ({...prev, username: "Username is required" }))
        }
        if (validateEmail(email)) {
            registerUser();
        }
    }

    const registerUser=async()=>{
        try{
            const response=await axios.post(`${import.meta.env.VITE_API_URL}register`,{
                'name':username,
                email,
                password
            })
            if(response.data.status==200){
                localStorage.setItem('token',response.data.token)
            }
        }catch(error){
            return;
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
                <Typography component="h2" variant="h6" >Register here</Typography>
                <Box mt={2} component="form" onSubmit={submitForm}>
                <TextField
                        placeholder="Enter username"
                        fullWidth={true}
                        sx={{
                        }}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></TextField>
                    <FormHelperText sx={{ color: 'red', h: 2, mb: 2 }}>
                        {errors.username}
                    </FormHelperText>
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
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} >Register</Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login;