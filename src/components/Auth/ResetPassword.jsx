import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

import { useEffect } from "react";
import { Paper,Container,Typography,FormHelperText,TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";

const ResetPassword = () => {

    
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const url = window.location.href;
        const params = url.split('/');
        const token = params[params.length - 1];
        setToken(token);
    })

    const submitForm=(e)=>{
        setError({
            password: "",
            confirmPassword: ""
        })
        e.preventDefault();
        if (!password) {
            setError((prev)=>({...prev,password:"Password is required"}));
            return false;
        }
        if (password!==confirmPassword) {
            setError((prev)=>({...prev,confirmPassword:"Passwords do not match"}));
            return false;
        }
        setError("");
        changePassword();
    }

    const changePassword=async()=>{
        try{
            const response=await axios.post(`${import.meta.env.VITE_API_URL}reset-password`,{
                token,
                password
            });
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <>
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }} >
                <Container >
                    <Paper elevation={3} sx={{p:3}}>
                        <Box component="form" onSubmit={submitForm} >
                            <Typography variant="h6">Reset Password</Typography>
                            <Typography variant="p" sx={{mb:4}}>Enter your new password</Typography>
                            <TextField
                               sx={{
                                mt:4,
                                "& .MuiInputBase-root": {
                          height: 40
                        }
                               }}
                                placeholder="Enter new password"
                                fullWidth={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormHelperText sx={{color:'red',mt:1}} >{error.password}</FormHelperText>
                             <TextField
                              sx={{
                                "& .MuiInputBase-root": {
                          height: 40
                        }
                               }}
                                placeholder="Enter confirmation password"
                                fullWidth={true}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                              <FormHelperText sx={{color:'red',mt:1}} >{error.confirmPassword}</FormHelperText>

                            <Button type="submit" variant="contained" fullWidth={true}>Reset</Button>
                        </Box>
                    </Paper>
                </Container>

            </div>
        </>
    );
}
export default ResetPassword;