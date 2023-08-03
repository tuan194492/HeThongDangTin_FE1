import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { AuthContext } from '../../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { getOwnerPost } from "../../../../api/owner/post";

import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const getRoomTypeLabel = (number) => {
    if (number === '1') 
        return 'Tìm phòng trọ';
    else if (number === '2')
        return 'Cho thuê nhà';
    else 
        return 'Bán bất động sản';
}

const legendData = [
    {item:'O', color: 'green', label: 'Đang được quảng cáo' },
    {item:'P', color: 'blue', label: 'Đang chờ phê duyệt' },
    {item:'R', color: 'red', label: 'Bị từ chối' },
    {item:'D', color: 'gray', label: 'Đã xóa' },
    {item:'U', color: 'orange', label: 'Đang được quảng bá' },
  ];

const columns = [{
    Header: 'Id',
    accessor: 'id',
    Cell: props => <span className='number'>{props.value ? props.value : 'Undifined'}</span>
  }, {
    Header: 'Type',
    accessor: 'type',
    Cell: props => <span className='text'>{getRoomTypeLabel(props.value)}</span> // Tùy biến component Cell.
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: props => <span className='text'>{props.value ? props.value : 0} (VND)</span> // Tùy biến component Cell.
  },
  {
    Header: 'Create date time',
    accessor: 'createdAt',
    Cell: props => <span className='text'>{props.value}</span> // Tùy biến component Cell.
  },
]

export default function PostManager() {
    const [postList, setPostList] = useState([]);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const fetchPostData = async () => {
        const result = await getOwnerPost(token);
        if (!result.success) {
            toast.error(result.message);
        } else {
            setPostList(result.data);
        }
    }

    const filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
    }


    useEffect(() => {
        fetchPostData();
    }, []);

    return (
        <div className="w-full">         
           <div className="text-4xl font-extrabold flex justify-between py-8">
                <p>Quản lý danh sách bản tin</p>
                <button className="flex items-center justify-center px-3 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-xl"
                        onClick={(e) => {
                            navigate('/owner/post/create');
                        }}>
                    <FontAwesomeIcon icon={faPlus} className="" />
                </button>
            </div>
            <ReactTable 
                getTrProps={(state, rowInfo, instance) => {
                    if (rowInfo) {
                        return {
                            onClick: (e) => {
                                navigate(`/owner/post/${rowInfo.original.id}`)
                            }
                        }
                    }
                    return {}  
                }}
                data={postList}
                columns={columns}
                defaultPageSize={20}
                filterable={true}
                defaultFilterMethod={filterMethod}
                minRows={10}
                />
            <div>
                <ul>
                    {legendData.map((item, index) => (
                    <li key={index}>
                        {item.item} 
                        <span style={{ backgroundColor: item.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px', marginLeft: '10px' }}></span>
                        {item.label}
                    </li>
                    ))}
                </ul>
            </div>
        </div>

         
    )
}