"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import ProfileImage from "../ProfileImage/ProfileImage";

const Modal = ({ closeProfile }) => {
  return createPortal(
    <div className="absolute top-0 left-0 flex justify-center items-center z-40 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh]">
      {/* <div>Modal</div>
      <ProfileImage />
      <button onClick={closeProfile}>Click</button> */}
      <div class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0 text-black">
        <div
          id="profile"
          class="w-full rounded-lg lg:rounded-l-lg shadow-2xl bg-white mx-6"
        >
          <div class="p-4 md:p-12 text-center lg:text-left">
            <ProfileImage w={20} h={20} />

            <h1 class="text-3xl pt-8">John Doe</h1>
            <div class="mx-auto w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

            <div className="mx-auto w-4/5 mt-5">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="age"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="age"
                    autoComplete="age"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="pet"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Pet
                </label>
                <div className="mt-2">
                  <input
                    id="pet"
                    name="pet"
                    type="pet"
                    autoComplete="pet"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div class="flex gap-2 mx-auto pt-12 pb-8">
              <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Update
              </button>
              <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
