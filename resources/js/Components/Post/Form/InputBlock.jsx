const InputBlock = ({value,label,name,className,onChange,error,children}) => {
    return (
        <div className={`mb-10 ${className}`}>
            <label className="text-xl text-gray-600 block mb-2"
                htmlFor={`input-${name}`}>{label}</label>
            { children ? children : (
                <input type="text" className="border-2 border-gray-300 p-2 w-full"
                    name={name} id={`input-${name}`}
                    value={value} onChange={onChange}/>
            ) }
            { error ? <p className="text-red-500 text-xs italic mt-2">{ error }</p> : "" }
        </div>
    )
}

export default InputBlock
