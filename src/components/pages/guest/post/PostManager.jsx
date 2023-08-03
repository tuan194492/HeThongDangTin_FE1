import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import { useState, useEffect } from "react"
import { getAllPostForGuest, getRelatedPostForGuest } from "../../../../api/guest/post/request";
import { toast } from 'react-toastify';
import PostMini from "./PostMini";
import "./style.css"
export default function PostManager () {
    const [currentPage, setCurrentPage] = useState(1);
    const [postData, setPostData] = useState([]);
    const [relatedPostData, setRelatedPostData] = useState([]);

    const [postCount, setPostCount] = useState(100);
    const fetchPostData = async () => {
        const result = await getAllPostForGuest(currentPage, 5);
        if (result.success) {
            setPostData(result.data.data.advertisements);
            setPostCount(result.data.data.count);
            console.log(result.data);
            console.log(result.data.data.count)
        } else {
            toast.error("Some errors happened. Please try again later!");
        }
    }

    const fetchRelatedPostData = async () => {
        const result = await getRelatedPostForGuest();
        if (result.success) {
            setRelatedPostData(result.data.data.advertisements);
        } else {
            toast.error("Some errors happened. Please try again later!");
        }
    }

    const fetchData = async () => {
        await fetchPostData();
        await fetchRelatedPostData();
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2" >
                <div className="text-4xl font-extrabold flex justify-between px-2 mb-[20px]">
                    <p>Danh sách bản tin</p>
                </div>
                {
                    postData.map(post => {
                        return (<PostMini isMini={false} postData={post} />)
                    })       
                }
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={5}
                    onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    totalItems={postCount}
                    pageNeighbours={3}
                    onlyPageNumbers={false}
                    customClassNames={{
                        rpbRootClassName: 'custom-root',
                    }}
                />

            </div>

            <div className="col-span-1">
                <div className="col-span-2" >
                    <div className="text-4xl font-extrabold flex justify-between px-2 mb-[20px]">
                        <p>Tin nổi bật</p>
                    </div>
                {
                    relatedPostData.map(post => {
                        return (<PostMini isMini={true} postData={post} />)
                    })       
                }
                </div>
            </div>
            
        </div>
    )
}