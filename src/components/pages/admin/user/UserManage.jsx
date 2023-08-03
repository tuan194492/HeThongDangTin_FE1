import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { AuthContext } from '../../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUser } from '../../../../api/admin/user/request';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { activeUser, disableUser } from "../../../../api/admin/user/request";


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
        <button onClick={(e) => handleActiveUser(e, props)} className="ml-[15px] flex items-center justify-center px-3 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-xl"><FontAwesomeIcon icon={faUnlock}/></button>
        <button onClick={(e) => handleDisableUser(e, props)} className="flex items-center justify-center px-3 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 text-xl"><FontAwesomeIcon icon={faLock}/></button>
    </div>
  }
]

let handleActiveUser = (e, props) => {

}
let handleDisableUser = (e, props) => {

};

export default function UserManage() {
    const [userList, setUserList] = useState([]);
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

    const initFunction = () => {
        handleActiveUser = async (e, props) => {
            e.stopPropagation();
            console.log(props)
            const result = await activeUser(token, props.row._original.id);
            console.log(result)
            if (!result.success) {
                toast.error(result.message);
            } else {
                toast.success(result.message);
            }
            await fetchUserData();
            
        }

        handleDisableUser = async (e, props) => {
            e.stopPropagation();
            const result = await disableUser(token, props.row._original.id);
            console.log(result)
            if (!result.success) {
                toast.error(result.message);
            } else {
                toast.success(result.message);
            }
            await fetchUserData();
        }
    }

    useEffect(() => {
        fetchUserData();
        initFunction();
    }, []);

    return (
        <div className="w-full">         
           <div className="text-3xl font-extrabold flex justify-between py-8">
                <p>Quản lý người dùng</p>
                
            </div>
            <ReactTable 
                data={userList}
                columns={columns}
                defaultPageSize={5}
                />
        </div>
    )
}