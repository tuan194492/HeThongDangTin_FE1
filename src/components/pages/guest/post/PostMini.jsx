import React from "react";
import { useNavigate } from "react-router-dom";

const baseServerLocation = `http://localhost:3000`;
const getRoomTypeLabel = (number) => {
    if (number === '1') 
        return 'Tìm phòng trọ';
    else if (number === '2')
        return 'Cho thuê nhà';
    else 
        return 'Bán bất động sản';
}
export default function PostMini({postData}) {
  const navigate = useNavigate();
  const postUrl = `${baseServerLocation}${ postData.attachments[0].substring(6) }`;
  const handleClick = () => {
    navigate(`/guest/post/${postData.id}`)
  }
  return (
    <div
        onClick={handleClick}
        className="p-1 flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
      <img
        className="object-cover max-h-[200px] w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={postUrl}
        alt=""
      />
      <div className="flex flex-col justify-start ml-[20px] leading-normal">
        <p className="mb-3 text-xl font-normal text-green-700 ">
            {postData.status == 'O' ? getRoomTypeLabel(postData.type) : '⭐ ' + getRoomTypeLabel(postData.type) + ' ⭐'}
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {postData.status == 'O' ? postData.title : '💪 '  + postData.title + ' 💪'}
        </h5>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {postData.remark.substring(0, 60)}
        </p>
      </div>
    </div>
  );
}
