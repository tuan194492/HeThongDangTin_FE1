import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getPostById } from "../../../../api/owner/post";
import { useParams } from "react-router";
import ImageSlider from "../../../organisms/common/ImagesSlider";
const baseServerLocation = `http://localhost:3000`;
const getRoomTypeLabel = (number) => {
    if (number === '1') 
        return 'Tìm phòng trọ';
    else if (number === '2')
        return 'Cho thuê nhà';
    else 
        return 'Bán bất động sản';
}
export const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const token = localStorage.getItem("token");
  const [postData, setPostData] = useState();
  const [postImages, setPostImages] = useState([]);
  const getPostImagesByImagesUrl = (imageUrls) => {
    const reducedArray = imageUrls.reduce((acc, value) => {
      if (
        value !== null &&
        value !== undefined &&
        value != "null" &&
        value.length > 6
      ) {
        acc.push(`${baseServerLocation}${value.substring(6)}`);
      }
      return acc;
    }, []);
    console.log(reducedArray);
    return reducedArray;
  };

  const fetchPostDataById = async () => {
    const result = await getPostById(token, postId);

    if (result.success) {
      console.log(result);
      setPostData(result.data);
      const images = getPostImagesByImagesUrl(result.data.attachments);
      setPostImages(images);
      const date = new Date(
        parseInt(result.data.createAt)
      ).toLocaleDateString();
      setPostData({ ...result.data, createAt: date });
    } else {
      toast.error(result.message);
    }
  };
  useEffect(() => {
    fetchPostDataById();
  }, []);
  return (
    <div>
      <div className="flex">
        <h2 className="text-4xl font-bold inline-block">Post #{postId}</h2>
        <h2 className="text-3xl font-bold inline-block flex ml-[44%] text-green-300">
          <img
            width="35"
            height="35"
            src="https://img.icons8.com/ios/35/overtime--v1.png"
            alt="overtime--v1"
          />{" "}
          <h2 className="ml-[5px]">{postData ? postData.createdAt : ""} </h2>
        </h2>
      </div>
        <div className="grid grid-cols-3 px-[0px] mt-[10px] ">
          <div className="col-span-3 border-solid border-2 border-slate-100 h-full bg-gray-50 px-[20px]	">
            <div className="grid grid-cols-3 px-[0px] mt-[10px] ">
              <div className="px-2">
                <div className="text-xl font-extrabold"> Loại </div>
                <input
                  type="text"
                  className="mt-[5px] ml-[20px]"
                  value={postData ? getRoomTypeLabel(postData.type) : ""}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="px-2 mt-[10px]">
              <div className="text-xl font-extrabold"> Title </div>
              <textarea
                id="title"
                name="title"
                className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                rows={4}
                value={postData ? postData.title : ""}
                readOnly={true}
              />
            </div>

            <div className="px-2 mt-[10px]">
              <div className="text-xl font-extrabold"> Remark </div>
              <textarea
                id="remark"
                name="remark"
                className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                rows={4}
                value={postData ? postData.remark : ""}
                readOnly={true}
              />
            </div>

            <div className="px-2 mt-[10px]">
              <div className="text-xl font-extrabold"> Address </div>
              <input
                id="address"
                name="address"
                type="text"
                className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                value={postData ? postData.address : ""}
                readOnly={true}
              />
            </div>

            <div className="px-2 mt-[10px]">
              <div className="text-xl font-extrabold"> Price </div>
              <input
                id="price"
                name="price"
                type="number"
                className="w-full px-3 py-2 border rounded-lg resize-none ml-[20px] mt-[10px]"
                value={postData ? postData.price : ""}
                readOnly={true}
              />
            </div>
            <div className='mt-[20px]'>
                <ImageSlider images={postImages} />
            </div> 
          </div>
        </div>
    </div>
  );
};
