import React, { useEffect, useState } from "react";

const AnimatedProgressBar = ({
  speed = 30,
  gradientColors = ["#6366f1", "#8b5cf6", "#d946ef"],
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;

    if (progress < 95) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, speed);
    }

    return () => clearInterval(intervalId);
  }, [progress]);

  const gradientStyle = {
    background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
  };

  return (
    <div className="my-24 w-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className={`relative h-4 w-full rounded-full overflow-hidden`}>
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