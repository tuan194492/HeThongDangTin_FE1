import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';
import Select from 'react-select';
import { ADVERTISEMENT_TYPE } from "../../../../utils/enum/post_type.enum";
import { postCreate } from "../../../../api/owner/post";

const options = [
    { value: ADVERTISEMENT_TYPE.TIM_PHONG_TRO, label: 'Tìm phòng trọ' },
    { value: ADVERTISEMENT_TYPE.CHO_THUE_NHA, label: 'Cho thuê nhà' },
    { value: ADVERTISEMENT_TYPE.BAN_BDS, label: 'Bán BDS' }
  ]

export default function PostCreate() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [uploadedImages, setUploadedImages] = useState([]);
    const handleDelete = (file) => {
        const updatedFiles = uploadedImages.filter((f) => f !== file);
        setUploadedImages(updatedFiles);
      };
    const onSubmit = async (data) => {
        console.log(data);
        console.log(uploadedImages)
        const result = await postCreate(token, data, uploadedImages);
        if (result.success) {
            toast.success(result.message);
            navigate("/owner/post");
        } else {
            toast.error(result.message);
        }
    }

    return (
        <div>
            <h1 className='text-gray-800 font-bold text-4xl mb-5 underline'>Tạo bản tin mới</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='grid grid-cols-3 px-[0px] mt-[10px] '>
                    <div className='px-2'>
                        <div className="text-xl font-extrabold"> Loại </div>
                        <Select className="mt-[5px] ml-[20px]" options={options} onChange={(e) => {
                            console.log(e)
                            setValue('type', e.value);
                        }} />
                    </div>
                </div>
                <div className='px-2 mt-[10px]'>
                    <div className="text-xl font-extrabold"> Title </div>
                    <textarea
                        id="title"
                        name="title"
                        className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                        rows={4}
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className="text-red-600 ml-[20px]">'Title is required'</p>}
                </div>

                <div className='px-2 mt-[10px]'>
                    <div className="text-xl font-extrabold"> Remark </div>
                    <textarea
                        id="remark"
                        name="remark"
                        className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                        rows={4}
                        {...register('remark', { required: true })}
                    />
                    {errors.remark && <p className="text-red-600 ml-[20px]">'Remark is required'</p>}
                </div>

                <div className='px-2 mt-[10px]'>
                    <div className="text-xl font-extrabold"> Address </div>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                        {...register('address', { required: true })}
                    />
                    {errors.address && <p className="text-red-600 ml-[20px]">'Address is required'</p>}
                </div>

                <div className='px-2 mt-[10px]'>
                    <div className="text-xl font-extrabold"> Price </div>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                        {...register('price', { required: true })}
                    />
                    {errors.price && <p className="text-red-600 ml-[20px]">'Price is required'</p>}
                </div>

                <div className="mt-[30px]">
                    <h2 className="text-2xl font-extrabold ml-[10px]">Images</h2>
                    <div className='grid grid-cols-12 gap-x-8 gap-y-4 mt-3'>
                    {
                        uploadedImages.map((uploadedImage, index) => {
                            return (
                                <li key={index} className='list-none col-span-4 flex flex-row items-start'>
                                    <img className="object-cover h-48 w-96" src={URL.createObjectURL(uploadedImages[index])} alt='Please'/>
                                    <button type='button' className='mx-[-22px] my-[-8px] px-2 font-bold rounded-md text-red-600 ml-[20px]-500 items-center text-xl hover:text-2xl' onClick={() => handleDelete(uploadedImage)}> x </button>
                                </li>
                            )    
                        })    
                    }
                    </div>
                    
                </div>
                <div>
                    <div className="mt-[50px]">
                        <input type="file" multiple id="file-input" name="ImageStyle" accept="image/jpeg, image/png" onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const newImages = [...uploadedImages, ...files];
                            setUploadedImages(newImages)
                        }}/>
                    </div>
                </div>
                <button                               
                    type='submit'
                    className='block w-1/6 mt-[20px] ml-[80%] bg-indigo-600 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                >
                    Create
                </button>

            </form>
        </div>
    );
}
