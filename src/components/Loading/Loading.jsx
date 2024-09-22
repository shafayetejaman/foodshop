import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const AnimatedProgressBar = ({
  speed = 30,
  gradientColors = ["#6366f1", "#8b5cf6", "#d946ef"],
  barHeight = "h-4",
}) =>
{
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const progressRef = useRef(null);

  useEffect(() =>
  {
    let intervalId;

    if (isRunning && progress < 95)
    {
      intervalId = setInterval(() =>
      {
        setProgress((prevProgress) =>
        {
          const newProgress = prevProgress + 1;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, speed);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, progress, speed]);

  const gradientStyle = {
    background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
  };

  return (
    <div className="my-24 w-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div
        className={`relative ${barHeight} w-full rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="95"
        ref={progressRef}
      >
        <div
          className={`absolute top-0 left-0 ${barHeight} rounded-full transition-all duration-300 ease-out`}
          style={{ ...gradientStyle, width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-white font-semibold">{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;