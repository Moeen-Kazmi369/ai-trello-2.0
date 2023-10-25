"use client";
import { useModalStore } from "@/store/ModalStore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import TaskTypeOptions from "./TaskTypeOptions";
import { useBoardStore } from "@/store/boardStore";
import Image from "next/image";
import { useParams } from "next/navigation";
const Modal = () => {
  const params=useParams()
  const { isOpen, closeModal, openModal } = useModalStore();
  const {
    addTaskInput,
    setaddTaskInput,
    setaddImage,
    addTaskType,
    image,
    addTaskInDB,
  } = useBoardStore();
  const handleSubmit=async(e)=>{
    e.preventDefault()
   const res= await addTaskInDB(addTaskInput,addTaskType,image,params.id)
    setaddTaskInput(null)
    setaddImage(null)
    closeModal()
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="form" onSubmit={e=>handleSubmit(e)} className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform space-y-3 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Add Task
                  </Dialog.Title>
                  <input
                    type="text"
                    id="first_name"
                    value={addTaskInput}
                    onChange={(e) => {
                      e.preventDefault();
                      setaddTaskInput(e.target.value);
                    }}
                    className="text-sm rounded-lg outline-none border w-full p-2.5"
                    placeholder="Enter a Task here"
                    required
                  />
                  <TaskTypeOptions />

                  <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      className={`flex flex-col items-center justify-center w-full ${image?"border":"border-2 border-black border-dashed"} rounded-lg cursor-pointer`}
                    >
                      {image ? (
                        <Image
                          src={URL.createObjectURL(image)}
                          height={200}
                          width={200}
                          alt="Uploaded Image"
                          className="w-full h-44 filter hover:grayscale transition-all duration-150 cursor-not-allowed object-cover"
                          onClick={(e) => {
                            e.preventDefault();
                            setaddImage(null);
                          }}
                        />
                      ) : (
                        <div className="flex flex-col py-2 items-center justify-center">
                          <svg
                            className="w-8 h-8 mb-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs">
                            SVG, PNG, JPG,MP4 or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        onChange={async(e) => {
                          e.preventDefault();
                          const file = e.target.files[0];
                          setaddImage(file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <button
                    type={'submit'}
                    disabled={!addTaskInput}
                    className=" font-medium hover:bg-black disabled:opacity-50 disabled:hover:bg-white hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Add Task
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
