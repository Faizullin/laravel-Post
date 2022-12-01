import { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CropperModal from "./CropperModal";


export default function CropperInput({defaultValue,id,onChange}){
    const [st,setSt] = useState(false);
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState();
    id=id || "dropzone-id";


    const handleCrop = (e) => {
        e.preventDefault();
        if (typeof cropper !== "undefined") {
            const cropperCanvas = cropper.getCroppedCanvas();
            setCropData(cropperCanvas.toDataURL());
            cropperCanvas.toBlob(function(blob){
                const file = new File([blob],blob.name || "unknown.jpg",{type:blob.type});
                onChange(file)
                setSt(false);
            });
        }
    }
    const handleImageUpload =(e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setSt(true);

        };
        console.log(files[0])
        reader.readAsDataURL(files[0]);

    }
    useEffect(()=>{
        if(defaultValue){
            setCropData(defaultValue);
        }
    },[]);
    return (
        <>
            <div className="flex justify-center items-center w-full">
                <label htmlFor={id} className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    { cropData ? (
                         <div className="w-full h-full flex justify-center items-center">
                            <img src={cropData} alt=""
                                className="object-cover"
                                style={{ maxHeight:"100%", }}/>
                        </div>
                     ) : (
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                     ) }

                    <input id={id} type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}/>
                </label>
            </div>
            <CropperModal st={st} setSt={setSt} title={`Crop Logo Image`} onSubmit={handleCrop}>
                <Cropper

                    src={image}
                    style={{ height: 400, width: "100%" }}
                    // Cropper.js options
                    initialAspectRatio={16 / 9}
                    guides={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
            </CropperModal>
        </>
    );
};
