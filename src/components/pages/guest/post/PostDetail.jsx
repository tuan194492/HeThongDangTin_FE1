import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getPostById } from '../../../../api/owner/post';
import { useParams } from 'react-router';
import ImageSlider from '../../../organisms/common/ImagesSlider';
const baseServerLocation = `http://localhost:3000`;



export const PostDetail = () => {
    const navigate = useNavigate();
    const params = useParams()
    const postId = params.id;
    const token = localStorage.getItem("token");
    const [postData, setPostData] = useState();
    const [postImages, setPostImages] = useState([]);
    const getPostImagesByImagesUrl = (imageUrls) => {
        const reducedArray = imageUrls.reduce((acc, value) => {
            if (value !== null && value !== undefined && value != "null" && value.length > 6) {
              acc.push(`${baseServerLocation}${ value.substring(6) }`);
            }
            return acc;
          }, []);
          console.log(reducedArray)
        return reducedArray;
    }

    const fetchPostDataById = async () => {
        const result = await getPostById(token, postId);
        
        if (result.success) {
            console.log(result)
            setPostData(result.data);
            const images = getPostImagesByImagesUrl(result.data.attachments);
            setPostImages(images);
            const date = new Date(parseInt(result.data.createAt)).toLocaleDateString(); 
            setPostData({...result.data, createAt: date});   
        } else {
            toast.error(result.message);
        }
    }
    useEffect(() => {
        fetchPostDataById();
    }, []);
    return (
        <div>
            <div className='flex'>
                <h2 className="text-4xl font-bold inline-block">Post #{postId}</h2>
                <h2 className="text-3xl font-bold inline-block flex ml-[44%] text-green-300"><img width="35" height="35" src="https://img.icons8.com/ios/35/overtime--v1.png" alt="overtime--v1"/> <h2 className='ml-[5px]'>{postData ? postData.createAt : ''} </h2></h2>
            </div>
            
            <div className='grid grid-cols-3 px-[0px] mt-[10px] '>
                <div className='col-span-2 border-solid border-2 border-slate-100 h-full bg-gray-50 px-[20px]	'>
                    <div className=''>
                        <ImageSlider images={postImages} />
                        <h2 className="text-2xl font-bold flex justify-center text-red-500 mt-[20px]">{postData ? postData.title : ''}</h2>
                    </div> 
                    <div className='flex mt-[10px]'>
                        <img width="25" height="25" src="https://img.icons8.com/ios/25/marker--v1.png" alt="marker--v1"/>
                        
                        <div className='ml-[20px] text-lg font-bold'>
                            {postData ? postData.address : 'No address'}
                        </div>
                    </div>
                    <div className='flex mt-[10px]'>
                        <img width="25" height="25" src="https://img.icons8.com/ios/25/price-tag-euro.png" alt="price-tag-euro"/>
                        <div className='ml-[20px] text-lg font-bold text-green-500'>
                            {`${postData ? postData.pricePerMonth : '0'} / tháng`}
                        </div>
                        
                        <img width="25" height="25" src="https://img.icons8.com/ios/25/water.png" alt="water" className='ml-[20px]'/>
                        <div className='ml-[10px] text-lg font-bold text-green-500'>
                            {`${postData ? postData.waterPrice : '0'} / tháng`}
                        </div>

                        <img width="25" height="25" src="https://img.icons8.com/ios/25/lightning-bolt--v1.png" alt="lightning-bolt--v1" className='ml-[20px]'/>
                        <div className='ml-[10px] text-lg font-bold text-green-500'>
                            {`${postData ? postData.electricPrice : '0'} / tháng`}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mt-[20px] text-orange-400">Description</h2>
                        <div>
                            <div className='ml-[10px] text-xl font-bold'>
                                + {postData && postData.description && postData.description.length > 5 ? postData.description : 'Curabitur semper ligula in lectus fringilla, eu molestie nisi imperdiet. Phasellus rhoncus varius ultrices. Fusce non quam odio. Vivamus vel dictum enim, vitae efficitur augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris varius ultricies tortor, at aliquam dolor. Quisque facilisis rhoncus mi, ac bibendum sapien pulvinar id. Vivamus ultrices eu sem nec blandit. Donec fermentum auctor nibh eget tempus.'}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-[20px] text-orange-400">Service</h2>
                        <div className='ml-[10px] text-xl font-bold'>
                            + {`${postData ? postData.services : 'No services'}`}
                        </div>

                        <h2 className="text-2xl font-bold mt-[20px] text-orange-400">Note</h2>
                        <div className='ml-[10px] text-xl font-bold'>
                            + {`${postData ? postData.note : 'No note'}`}
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='user-profile'>
                        <h2 className="text-3xl font-bold flex justify-center text-red-500 mt-[20px]">Contact</h2>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex items-center p-4">
                                <div className="mr-4">
                                <img src={postData && postData.avatar && postData.avatar.length > 6 ? `${baseServerLocation}\\${ postData.avatar.substring(6) }` : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'} alt="Avatar" className="h-30 w-30 rounded-full" />
                                </div>
                                <div className='text-center'>
                                    <h3 className="text-2xl font-bold">{postData ? postData.name : 'Nguyen Quoc Tuan'}</h3>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-1">
                                        {postData ? postData.phone : 'No phone'}
                                    </button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
                 
        </div>
    )
}