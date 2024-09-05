import React from "react";
import MotionItem from "./defaults/MotionItem";

const CircularText = () => {
  return (
    <MotionItem
      initial={{ rotate: 0 }}
      animate={{
        rotate: 360,
        transition: { ease: "linear", duration: 9, repeat: Infinity },
      }}
      className="circle-container"
    >
      <svg viewBox="0 0 200 200" className="circular-text">
        <defs>
          <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"></path>
        </defs>
        <text>
          <textPath href="#circlePath" startOffset="50%" text-anchor="middle">
            ENHANCE YOUR KNOWLEDGE and Boost your skills with our diverse courses
          </textPath>
        </text>
      </svg>

      <div className="center-text blue_gradient">RESALA</div>
    </MotionItem>
  );
};

export default CircularText;
