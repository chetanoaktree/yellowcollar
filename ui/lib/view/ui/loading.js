import React, { useState, useRef } from "react";

const Loading=(i)=>{
  let {value, className, isProcessing} = i
  let value_ = isProcessing == true  ? (<div className={className}><img src={"/images/loading.svg"}/></div>) : value
  return (
    <div>{value_}</div>
  )
}

export default Loading
