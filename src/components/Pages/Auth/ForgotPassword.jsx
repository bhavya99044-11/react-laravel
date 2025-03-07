import { Box, Button, Container, FormHelperText, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useState } from "react";

const ForgotPassword=()=>{
    const[email,setEmail]=useState('');
    const[error,setError]=useState('');
    const submitForm=(e)=>{
        e.preventDefault();
        if(!email){
            setError('Email is required')
            return false;
        }
        setError('')
        resetPassword();
    }
    const resetPassword=async(e)=>{
        try{
            const response=await axios.post(`${import.meta.env.VITE_API_URL}forgot-password`,{
                email
            })
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div  style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{p:2}}>
                    <Typography variant="h6">Reset Password</Typography>
                    <Typography variant="p">Enter your email to send the resent link</Typography>
                    <Box mt={2} component="form" onSubmit={submitForm}>
                    <TextField 
                    placeholder="Enter email"
                    fullWidth={true}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    sx={{mt:4,
                        "& .MuiInputBase-root": {
                          height: 40
                        }
                    }}
                    ></TextField>
                    <FormHelperText  sx={{ color: 'red', h: 2, mb: 2 }}>
                        {error}
                    </FormHelperText>
                    <Button type="submit" variant="contained" fullWidth={true} sx={{mt:2}}>Reset</Button>
                    </Box>
                </Paper>
            </Container>
         </div>
    )
}

export default ForgotPassword;