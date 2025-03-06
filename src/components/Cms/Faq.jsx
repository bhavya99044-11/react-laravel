import { Container,Paper } from "@mui/material";
import React from "react";
import { useState } from "react";

const Faq=()=>{

  const [isModalOpen,setIsModalOpen]=useState(false);
  const toggleModal=()=>{
    setIsModalOpen(!isModalOpen);
  }

  const submitForm=()=>{
    console.log('Form submitted');
  }
    return (
      <div>
        <button className="bg-blue-400 p-5" onClick={submitForm}>Add Faqs</button>
     {isModalOpen && ( <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                               
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    </div>
    
    );
}

export default Faq;