import React from "react";


const Input = ({ id, name, placeholder, type, className = "", value, onChange }) => {
    const classname = className !== "" ? className : "border-solid border-[#D9D9D9] border-2 rounded-2xl h-11 w-60 text-center placeholder-[#B3B3B3]"

    return (
        <input className={classname} value={value} placeholder={placeholder} type={type} id={id} name={name} onChange={onChange}/>
    )
}

export default Input