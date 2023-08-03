import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getPostById, deletePostById, upgradePost } from "../../../../api/owner/post";
import { useParams } from "react-router";
import ImageSlider from "../../../organisms/common/ImagesSlider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const baseServerLocation = `http://localhost:3000`;
const getRoomTypeLabel = (number) => {
  if (number === '1')
    return 'Tìm phòng trọ';
  else if (number === '2')
    return 'Cho thuê nhà';
  else
    return 'Bán bất động sản';
}

const getStatusLabel = (number) => {
  if (number == 'O')
    return <p className="text-green-400">Tin đang được quảng cáo</p>;
  else if (number == 'P')
    return <p className="text-blue-400">Đang chờ phê duyệt</p>;
  else if (number == 'D')
    return <p className="text-gray-400">Đã bị xóa</p>;
  else if (number == 'U')
    return <p className="text-orange-400">Đang được quảng bá</p>;
  else
    return <p className="text-red-400">Bị từ chối đăng</p>;
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

  const handleDelete = async () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async (e) => {
            const result = await deletePostById(token, postId);
            if (result.success) {
              navigate('/owner/post');
              toast.success('Delete Post Successful!');
            } else {
              toast.error(result.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Close')
        }
      ]
    });

  }

  const handleUpgrade = async () => {
    const result = await upgradePost(token, postId);
    if (result.success) {
      navigate('/owner/post');
      toast.success('Upgrade Post Successful!');
    } else {
      toast.error(result.message);
    }
  }

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
        {
          postData && postData.status == 'O' &&
          <button
            className="ml-[200px] px-3 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 text-xl"
            onClick={handleUpgrade}
          >
            <FontAwesomeIcon icon={faArrowUp} className="" />
          </button>
        }
        {
          postData && postData.status == 'O' &&
          <button
            className="ml-[20px] px-3 py-2 text-white bg-red-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 text-xl"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} className="" />
          </button>
        }

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
              <div className="text-xl font-extrabold mt-[10px]"> Trạng thái </div>
              <div className="text-m font-extrabold ml-[20px]">
                {postData ? getStatusLabel(postData.status) : ''}
              </div>

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
