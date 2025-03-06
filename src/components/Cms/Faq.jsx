import { Container, InputLabel, Paper, TextField ,Box} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Faq = () => {

  const[error,setError]=useState('');
  const [faq, setFaq] = useState([{
    id: Date.now(),
    question: '',
    answer: ''
  }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  useEffect(() => {

  })
  const submitForm = async(e) => {
    setError('')
   checkValidation(e);
   var promise=new Promise((resolve, reject) =>{
    checkValidation(e);
    resolve();
   });
   promise.then(()=>{
    console.log('form submitted')
     if(error =='') toggleModal();
    // e.target.reset();
   })
  //  e.target.reset();

  }

  const checkValidation=(e)=>{
    e.preventDefault();
    faq.forEach((item) => {
      if(item.question === '' || item.answer === ''){
        console.log('222')
       setError('Please fill all fields');
      }
    });
    return true;
  }

  const changeValue=(key,value,id)=>{
    faq.forEach((item) => {
      if(item.id === id){
        item[key] = value;
      }
    });
    setFaq([...faq]);
  }

  const addMore = () => {
    const newFaq = {
      id: Date.now(),
      question: '',
      answer: ''
    }
    setFaq([...faq, newFaq]);

  }

  const removeFaq=(id)=>{
    setFaq(faq.filter((item) => item.id!== id));

  }

  const imageClick=(id)=>{
   document.getElementById(`image_click_${id}`).click();
    console.log('Image clicked');
  }

  const imageUpload=(e,id)=>{
    const file = e.target.files[0];
    faq.forEach((item)=>{
      if(item.id === id){
        item.image =file;
      }
    })
    setFaq([...faq]);
  }
  return (
    <div>
      <button className="bg-blue-400 p-5" onClick={toggleModal}>Add Faqs</button>
      {isModalOpen && (<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
              <Box component='form' onSubmit={submitForm}>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {faq.map((item,i) => {
                return (
                  <div key={item.id} class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start w-full ">

                      <div className="flex  justify-center w-full ">
                        <input type="file" className="hidden" id={`image_click_${item.id}`} onChange={(e)=>imageUpload(e,item.id)}/>
                        <FaCloudUploadAlt onClick={()=>imageClick(item.id)} size={50} className="cursor-pointer text-blue-500 hover:border hover:border-blue-700 hover:border-dashed rounded-full hover:text-blue-600" />
                        
                      </div>
                      <div className="h-[50px] flex justify-center items-center h-full">
                      {i?<FaMinus 
                      onClick={()=>removeFaq(item.id)}
                      />:null}
                    </div>
                    </div>
                    <div className="">
                    </div>
                    <InputLabel
                    >Question</InputLabel>
                    <TextField 
                    onChange={(e)=>changeValue('question',e.target.value,item.id)}
                    fullWidth 
                    placeholder="Enter question"></TextField>
                    <InputLabel>Answer</InputLabel>
                    <TextField 
                    onChange={(e)=>changeValue('answer',e.target.value,item.id)}
                    fullWidth placeholder="Enter Answer"></TextField>
                  </div>
                )
              })}
              <div class="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
                <div>
                  <button type="button" onClick={addMore} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >Add more</button>
                </div>
                <div>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={toggleModal}>Close</button>
                  <button type="submit" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
              </Box>
      </div>)}
    </div>

  );
}

export default Faq;