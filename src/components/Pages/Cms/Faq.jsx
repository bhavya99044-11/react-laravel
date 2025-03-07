import { Container, InputLabel, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { document } from "postcss";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from "axios";
const Faq = () => {

  const imageRef = useRef(null);
  const [error, setError] = useState([]);
  const dataJson={
    id: Date.now(),
    question: '',
    answer: '',
    image: "",
    image_path: '',
  }
  const [faq, setFaq] = useState([dataJson]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  useEffect(() => {
   setFaq([dataJson])
   setError([])
  },[isModalOpen])

  const submitForm = async (e) => {
    let valid = checkValidation(e);
    if (valid) {
      sendFaqApi();
      setFaq([
        {
          id: Date.now(),
          question: '',
          answer: '',
          image: "",
          image_path: '',
        }
      ])
    }
  }

  const checkValidation = (e) => {
    e.preventDefault();
    let isValid = true;
    const duplicateError = [...error];
    faq.forEach((item) => {
      if (item.question == '' || item.answer == '') {
        isValid = false;
        let index = duplicateError.find((cc) => cc.id === item.id);
        if (index) {
          index.question = item.question == '' && true;
          index.answer = item.answer == '' && true;
          isValid = false;
        } else {
          const newError = {
            id: item.id,
            question: item.question == '' && true,
            answer: item.answer == '' && true
          }
          duplicateError.push(newError);
        }
      } else {
        let index = duplicateError.find((cc) => cc.id === item.id);
        index && duplicateError.splice(index, 1);
      }
    });
    setError(duplicateError);

    return isValid;
  }

  const sendFaqApi = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}faq`, {
        faq
      })
      console.log(response);
    } catch (e) {
      console.log(e)
    }
  }
  const changeValue = (key, value, id) => {
    faq.forEach((item) => {
      if (item.id === id) {
        item[key] = value;
      }
    });
    setFaq([...faq]);
  }

  const addMore = () => {
    const newFaq = {
      id: Date.now(),
      question: '',
      image: "",
      image_path: "",
      answer: ''
    }
   
    setFaq([...faq, newFaq]);

  }

  const removeFaq = (id) => {
    setFaq(faq.filter((item) => item.id !== id));
    setError(error.filter((item) => item.id !== id));
  }

  const imageClick = (id) => {
    console.log('fffffffff',id)
    imageRef.current.click();
  }

  const imageUpload =(id)=>(e) => {
    console.log(id)
    const file = e.target.files[0];
    faq.forEach((item) => {
      if (item.id === id) {
        item.image = file;
        var url = URL.createObjectURL(file);
        item.image_path = url;
      }
    })

    setFaq([...faq]);
  }
  return (
    <div>
      <button className="bg-blue-400 p-5" onClick={toggleModal}>Add Faqs</button>
      {isModalOpen && (<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
        <Box component='form' onSubmit={submitForm}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="max-h-[500px] overflow-y-scroll " id="scroll-height" >
                  {faq.map((item, i) => {
                    return (
                      <div key={item.id} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start w-full ">

                          <div className="flex  justify-center w-full ">
                            <input type="file" accept="image/*" className="hidden" ref={imageRef} onChange={imageUpload(item.id)} />
                            {!item.image_path && <FaCloudUploadAlt onClick={() => imageRef.current.click()} size={50} className="cursor-pointer text-blue-500 hover:border hover:border-blue-700 hover:border-dashed rounded-full hover:text-blue-600" />}
                            {item.image_path && <img onClick={() => imageClick(item.id)} className="cursor-pointer text-blue-500 h-[50px] w-[50px] hover:border hover:border-blue-700 hover:border-dashed rounded-full hover:text-blue-600" src={item.image_path}></img>}
                          </div>
                          <div className="h-[50px] flex justify-center items-center h-full">
                            {faq.length > 1 ? <span className="text-red-500 cursor-pointer"><FaMinus
                              onClick={() => removeFaq(item.id)}
                            /></span> : null}
                          </div>
                        </div>
                        <InputLabel
                        >Question</InputLabel>
                        <TextField
                          onChange={(e) => changeValue('question', e.target.value, item.id)}
                          fullWidth
                          placeholder="Enter question"></TextField>
                        <FormHelperText sx={{ color: 'red' }}>{error.map((data) => {
                          if (data.id == item.id) {
                            return data.question ? "Question field is required" : "";
                          }
                        })}</FormHelperText>
                        <InputLabel>Answer</InputLabel>
                        <TextField
                          onChange={(e) => changeValue('answer', e.target.value, item.id)}
                          fullWidth placeholder="Enter Answer"></TextField>
                        <FormHelperText sx={{ color: 'red' }}>{error.map((data) => {
                          if (data.id == item.id) {
                            return data.answer ? "answer field is required" : "";
                          }
                        })}</FormHelperText>
                      </div>
                    )
                  })}
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
                  <div>
                    <button type="button" onClick={addMore} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >Add more</button>
                  </div>
                  <div>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={toggleModal}>Close</button>
                    <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >Submit</button>
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