import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import MultiSelectStyle from './MultiSelect.css';

export default function MultiSelect({onChange,options,selectedValues}){
    const [isDropdownOpen,setIsDropdownOpen] = useState(false);
    const [selectedOptions,setSelectedOptions] = useState(selectedValues);
    const [filteredOptions,setFilteredOptions] = useState([]);
    const [inputValue,setInputValue] = useState("");
    const handleAddOption = (key,value) => {
        console.log("Add",key,value,selectedOptions)
        setSelectedOptions(selectedOptions => ([...new Set([
            ...selectedOptions,
            key,
        ])]));
    }

    const handleRemoveOption = (key) => {
        let tmp = new Set(selectedOptions);
        tmp.delete(key);
        tmp = [...tmp];
        setSelectedOptions(option => ([
            ...tmp
        ]));
    }
    const matchValues = (value, search) => {
        return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    useEffect(()=>{
        console.log("I",selectedValues,options,Object.entries(options).map( ([optionKey, label],index) => [optionKey,label] ))
        if(inputValue){
            setIsDropdownOpen(true)
        }else{
            setIsDropdownOpen(false)
        }
        setFilteredOptions( Object.entries(options).filter(([key,value]) => matchValues(value,inputValue)).map(value => value[0]) );
    },[inputValue,options]);
    useEffect(() => {
        onChange(selectedOptions);
    },[selectedOptions])
    return (
        <div className="w-full flex flex-col items-center h-64 mx-auto">
            <div className="w-full px-4">
                <div className="flex flex-col items-center relative">
                    <div className="w-full  svelte-1l8159u">
                        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                            <div className="flex flex-auto flex-wrap">
                                { selectedOptions.map((optionKey,index) => (
                                    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                                        key={index}>
                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{ options[optionKey] }</div>
                                        <div className="flex flex-auto flex-row-reverse">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                                                    onClick={()=>handleRemoveOption(optionKey)}>
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex-1">
                                    <input placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                                        value={inputValue} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" type='button'
                                    onClick={()=>{setIsDropdownOpen(!isDropdownOpen)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className={`feather feather-chevron-up w-4 h-4 ${ isDropdownOpen ? "rotate-180" : "" }`}>
                                        <polyline points="18 15 12 9 6 15"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    { isDropdownOpen &&
                            <div className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                            <div className="flex flex-col w-full">
                                {/* { (filteredOptions.length>0) ?
                                        filteredOptions.map((optionKey,index) => {
                                            console.log("filter",optionKey)
                                            return selectedOptions.includes(optionKey) ? "" : (
                                                <div className={`cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100`}
                                                    onClick={ (e) => handleAddOption(optionKey) } key={index} >
                                                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                        <div className="w-full items-center flex">
                                                            <div className="mx-2 leading-6  ">{ options[optionKey] }</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    :
                                        Object.entries(options).map( ([optionKey, label],index) => {
                                            console.log("simple",optionKey)
                                            return selectedOptions.includes(optionKey) ? "" : (
                                                <div className={`cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100`}
                                                    onClick={ (e) => handleAddOption(optionKey,label) } key={index} >
                                                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                        <div className="w-full items-center flex">
                                                            <div className="mx-2 leading-6  ">{ label }</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                } */}
                                {Object.entries(options).map( ([optionKey, label],index) => {
                                    console.log("simple",optionKey)
                                    return selectedOptions.includes(optionKey) ? "" : (
                                        <div className={`cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100`}
                                            onClick={ (e) => handleAddOption(optionKey,label) } key={index} >
                                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                <div className="w-full items-center flex">
                                                    <div className="mx-2 leading-6  ">{ label }</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}




export function useSelectOptions({
        label,
        data,
        value,
        selectedData,
    }){
    const res = {},
        selectedRes=[];
    data.forEach(item => {
        res[item[value]] = item[label];
    });
    selectedData.forEach(item => {
        selectedRes.push(item[value]);
    });
    return [res,selectedRes];
}
