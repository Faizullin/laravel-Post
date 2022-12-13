

export default function InputBlock({children,value,label,name,className,onChange,error}) {
	return (
        <div className={`mb-10 ${className}`}>
            <label className="text-xl text-gray-600 block mb-2"
                htmlFor={`input-${name}`}>{label}</label>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title"
            	htmlFor={`input-${name}`}>
                Title
            </label>
            { children ? children : (
            	<>
                <input type="text" className="border-2 border-gray-300 p-2 w-full"
                    name={name} id={`input-${name}`}
                    value={value} onChange={onChange}/>
               	<input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text"
                    name={name} id={`input-${name}`}
                    value={value} onChange={onChange}/>
              	</>
            ) }
            { error ? <p className="text-red-500 text-xs italic mt-2">{ error }</p> : "" }
        </div>
	)
}