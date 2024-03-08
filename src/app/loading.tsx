import React from "react";

const Loading = () => {
  return (
    <div className="text-center my-5 mx-5 flex justify-center items-center w-screen h-screen">
      <div className="animate-spin w-20 h-20 border-t-4 border-b-4 border-orange-400 rounded-full"></div>
    </div>
  );
};

export default Loading;
