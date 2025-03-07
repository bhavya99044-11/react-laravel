import { Container, InputLabel, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { document } from "postcss";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from "axios";
const Faq = () => {

  const scrollHeight = useRef(null);
  const imageRef = useRef(null);
  const [error, setError] = useState([]);
  const [faq, setFaq] = useState([{
    id: Date.now(),
    question: '',
    answer: '',
    image:"",
    image_path: '',
  }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  useEffect(() => {
  })

  const submitForm = async (e) => {
    let valid = checkValidation(e);
    if (valid) {
      sendFaqApi();
      setFaq([
        {
          id: Date.now(),
          question: '',
          answer: '',
          image:"",
          image_path: '',
        }
      ])
      //  toggleModal();
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
      image:"",
      image_path:"",
      answer: ''
    }
    const lastElement = scrollHeight.current.lastElementChild;
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: "smooth" });
    }
    setFaq([...faq, newFaq]);

  }

  const removeFaq = (id) => {
    setFaq(faq.filter((item) => item.id !== id));
    setError(error.filter((item) => item.id !== id));
  }

  const imageClick = (id) => {
    document.getElementById(`image_click_${id}`).click();
    console.log('Image clicked');
  }

  const imageUpload = (e, id) => {
    const file = e.target.files[0];
    faq.forEach((item) => {
      if (item.id === id) {
        item.image = file;
        var url = URL.createObjectURL(file);
        item.image_path = url;
      }
    })
    console.log(faq[0].image)

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
              <div class="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="h-[300px] overflow-y-scroll " id="scroll-height" ref={scrollHeight}>
                  {faq.map((item, i) => {
                    return (
                      <div key={item.id} class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start w-full ">

                          <div className="flex  justify-center w-full ">
                            <input type="file" className="hidden" id={`image_click_${item.id}`} onChange={(e) => imageUpload(e, item.id)} />
                            {!item.image_path && <FaCloudUploadAlt onClick={() => imageClick(item.id)} size={50} className="cursor-pointer text-blue-500 hover:border hover:border-blue-700 hover:border-dashed rounded-full hover:text-blue-600" />}
                            {item.image_path && <img onClick={() => imageClick(item.id)} className="cursor-pointer text-blue-500 h-[50px] w-[50px] hover:border hover:border-blue-700 hover:border-dashed rounded-full hover:text-blue-600" src={item.image_path}></img>}
                          </div>
                          <div className="h-[50px] flex justify-center items-center h-full">
                            {faq.length > 1 ? <FaMinus
                              onClick={() => removeFaq(item.id)}
                            /> : null}
                          </div>
                        </div>
                        <div className="">
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