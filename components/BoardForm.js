"use client";
import { setboardInDB } from "@/lib/setBoardInDB";
import { useBoardFormStore } from "@/store/BoardFormStore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
const BoardForm = () => {
  const {
    isOpen,
    closeForm,
    openForm,
    boardFormState,
    setboardState,
    updateBoardLists,
    boardLists,
  } = useBoardFormStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await setboardInDB(boardFormState);
      console.log(res)
      updateBoardLists([...boardLists, res]);
    } catch (error) {
      console.log(error);
    }
    closeForm();
    setboardState("");
  };
  return (
    <div className={`${isOpen ? "backdrop-blur-3xl filter" : null}`}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="form"
          onSubmit={(e) => handleSubmit(e)}
          className="relative z-10"
          onClose={closeForm}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a New Board
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={boardFormState}
                      onChange={(e) => setboardState(e.target.value)}
                      placeholder="Project 1"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type={"submit"}
                      disabled={!boardFormState}
                      className="inline-flex justify-center disabled:opacity-50 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default BoardForm;
