import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const Carousel = (props) => {
  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   const prevSlide = () => {
  //     props.setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? props.children.length - 1 : prevIndex - 1
  //     );
  //   };

  //   const nextSlide = () => {
  //     props.setCurrentIndex((prevIndex) =>
  //       prevIndex === props.children.length - 1 ? 0 : prevIndex + 1
  //     );
  //   };

  return (
    <div className={` relative h-full w-full`}>
      {props.currentIndex == 3 || props.currentIndex == 4 ? (
        <></>
      ) : (
        <div className="flex absolute top-10 left-10">
          <button
            className="flex gap-2 items-center"
            onClick={() => props.setCurrentIndex(props.currentIndex - 1)}
          >
            {" "}
            <FaArrowLeft />
            Back
          </button>
        </div>
      )}
      <div className="h-full flex flex-col justify-center items-center">
        {props.children.map((item, index) => (
          <div
            key={index}
            className={`
             transition-opacity duration-500 ${props.cardStyle} 
          ${index === props.currentIndex ? "" : "hidden"}
        `}
          >
            {item}
          </div>
        ))}
        {props.currentIndex < 4 && (
          <p className="pt-3 w-[500px] text-center text-gray-400">
            Signing up for account means you agree to the{" "}
            <a href="#">Privacy Policy </a> & <a href="#">Terms of Service.</a>
          </p>
        )}
      </div>
      <div className=" absolute top-10 flex items-center w-full justify-center ">
        <div className={` right-4  flex  gap-2 `}>
          {props.children.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-2 rounded-2xl border cursor-pointer   ${
                index !== props.currentIndex ? " bg-[#E3E5E5]" : " bg-[#FFFFFF]"
              }`}
              onClick={() => props.setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
