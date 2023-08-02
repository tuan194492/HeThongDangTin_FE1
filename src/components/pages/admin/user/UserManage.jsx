import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { AuthContext } from '../../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { getAllUser } from '../../../../api/admin/user/request';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const columns = [{
    Header: 'Name',
    accessor: 'name',
    Cell: props => <span className='number'>{props.value ? props.value : 'Undifined'}</span>
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Tùy biến component Cell.
  },
  {
    Header: 'Status',
    accessor: 'status',
    width: 80,
  },
  {
    Header: 'Zalo number',
    accessor: 'zalo_number'
  },
  {
    Header: 'Action',
    accessor: 'Button',
    width: 140,
    Cell: props => <div className="flex gap-x-5">
        <button className="ml-[15px] flex items-center justify-center px-3 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-xl"><FontAwesomeIcon icon={faUnlock}/></button>
        <button className="flex items-center justify-center px-3 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 text-xl"><FontAwesomeIcon icon={faLock}/></button>
    </div>
  }
]

export default function UserManage() {
    const [userList, setUserList] = useState();
    const {token} = useContext(AuthContext);
    const fetchUserData = async () => {
        const result = await getAllUser(token);
        if (!result.success) {
            toast.error(result.message);
        } else {
            console.log(result.data);
            setUserList(result.data);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="w-full">         
           <div className="text-3xl font-extrabold flex justify-between py-8">
                <p>User Manager</p>
                
            </div>
            <ReactTable 
                data={userList}
                columns={columns}
                defaultPageSize={5}
                />
        </div>
    )
}