import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import { useState, useEffect } from "react"
import { getAllPostForGuest, getRelatedPostForGuest } from "../../../../api/guest/post/request";
import { toast } from 'react-toastify';

export default function PostManager () {
    const [currentPage, setCurrentPage] = useState(1);
    const [postData, setPostData] = useState([]);
    let pageCount = 1;
    const fetchPostData = async () => {
        const result = await getAllPostForGuest(currentPage, 5);
        if (result.success) {
            setPostData(result.data);
            pageCount = result.data.count;
            console.log(result.data);
        } else {
            toast.error("Some errors happened. Please try again later!");
        }
    }

    useEffect(() => {
        fetchPostData();
    }, [currentPage]);

    return (
        <div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={5}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                totalItems={pageCount}
                pageNeighbours={2}
            />
        </div>
    )
}