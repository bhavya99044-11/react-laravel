import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Style.css'
import axios from 'axios';
import { Box, Container, Paper, Typography,Button } from '@mui/material';
const App = () => {
    const [content, setContent] = useState('');

    const submitForm=(e)=>{
        e.preventDefault();
        postData();
    }

    const postData = async()=>{
        try{
            const response= await axios.post(`${import.meta.env.VITE_API_URL}contact-us`,{content})
            if(response.data.status==200){
                console.log('Data posted successfully')
            }
            }catch(e){
                console.log(e)
            }
    }

    useEffect(()=>{
        getData();
    },[])

    const getData=async()=>{
        try{
            const response= await axios.get(`${import.meta.env.VITE_API_URL}contact-us`)
            if(response.data.status==200){
                setContent(response.data.data)
               
            }
            }catch(e){
                console.log(e)
            }
    }

    return (
        <div>
            <div style={{ width: '500px', height: '500px' ,marginLeft:'50px',marginTop:'50px'}}>

           <Container maxWidth="sm">
                <Box component="form" onSubmit={submitForm }>
                    <Paper elevation={3} sx={{
                        p:2
                    }}>
                        <Typography variant='h6' sx={{
                            textAlign: 'center'
                        }} component='h2'>Contact Us</Typography>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            height: '500px',
                            licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDI1MTUxOTksImp0aSI6IjdmMWRiNTNjLTYzYmMtNDVjMS04NjQwLWU0YTkxZTdkMzA0OCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImI2ZjRjZTU4In0._ypNjwyw1Ryjr7VEB5Hu4fuJwcFZH0rTevN3w0ZoQJ1-3jmNFNkCAsfBz-jX03TZmG0ODZE7HvKqj6W0dXE_Bg', // Add the license key here
                            initialData:content
                        }}
                        content='bhavya'
                        style={{
                            width: '50px',
                        }}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                    <Button  variant="contained" sx={{
                        mt: 2,
                    }} type="submit" fullWidth={true}>Upload</Button>
                    </Paper>
                </Box>
            </Container>
        </div>
        </div>
    );
};

export default App;