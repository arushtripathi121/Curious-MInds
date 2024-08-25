import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const ImageCard = ({ onClose, images }) => {
    const [viewImage, setViewImage] = useState(0);

    const handleImageView = (direction) => {
        if (direction == "right") {
            if (viewImage == images.length - 1) {
                setViewImage(0);
                console.log(viewImage);
            }
            else {
                setViewImage(viewImage + 1);
                console.log(viewImage);
            }
        }
        else {
            if(viewImage == 0) {
                setViewImage(images.length - 1);
                console.log(viewImage);
            }
            else{
                setViewImage(viewImage - 1);
                console.log(viewImage);
            }
        }
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60'>
            <div className='relative w-full max-w-6xl bg-black border border-gray-300 rounded-lg shadow-2xl overflow-hidden'>
                <button className='absolute top-4 right-4 text-gray-400 hover:text-white'>
                    <IoClose className='w-10 h-8' onClick={onClose} />
                </button>
                <div className='flex flex-row items-center justify-between h-[90svh] w-[full] overflow-y-auto p-6'>
                    <div><IoIosArrowDropleft className='text-white text-4xl' onClick={() => handleImageView("left")}/></div>
                    <div><img src={images[viewImage]}/></div>
                    <div><IoIosArrowDropright className='text-white text-4xl' onClick={() => handleImageView("right")}/></div>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
