import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { AuthContext } from '../../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPayment, addAmtToPayment, getAddToAccountHistory } from "../../../../api/owner/payment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
const fixedAmt = 1000000;

const columns = [{
    Header: 'Lượng tiền nạp',
    accessor: 'total_amt',
    Cell: props => <span className='number'>{props.row.total_amt} (VND)</span>
  }, {
    Header: 'Giảm giá',
    accessor: 'discount_amt',
    Cell: props => <span className='number'>{props.row.discount_amt} (VND)</span> // Tùy biến component Cell.
  },
  {
    Header: 'Tổng số dư',
    accessor: 'balance_amt',
    Cell: props => <span className='number'>{props.row.balance_amt} (VND)</span> // Tùy biến component Cell.
  },
  {
    Header: 'Ghi chú',
    accessor: 'remark'
  },
  {
    Header: 'Thời gian',
    accessor: 'createdAt'
  }
]

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export default function PaymentAccountManager() {
    const navigate = useNavigate();
    const {token, user} = useContext(AuthContext);
    const [paymentAccount, setPaymentAccount] = useState({});
    const [paymentHistory, setPaymentHistory] = useState([]);
    const fetchPaymentData = async () => {
        const result = await getPayment(token, user.id);
        if (result.success) {
            console.log(result.data.data)
            setPaymentAccount(result.data.data);
        }
        else {
            toast.error(result.message);
        }
    }

    const fetchPaymentHistoryData = async () => {
        const result = await getAddToAccountHistory(token);
        console.log(result)
        if (result.success) {
            console.log(result.data.list)
            setPaymentHistory(result.data.list);
        }
        else {
            toast.error(result.message);
        }
    }

    const fetchData = async () => {
        await fetchPaymentData();
        await fetchPaymentHistoryData();
    }

    const addAmt = async () => {
        const result = await addAmtToPayment(token, user.id, fixedAmt);
        if (result.success) {
            setPaymentAccount(result.data.data);
            toast.success(result.message);
            
        }
        else {
            toast.error(result.message);
        }

        await fetchData();
    }
    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <div className="w-full">     
            <div className="text-xl font-bold flex justify-between py-8">
                <p>Tài khoản chính: {paymentAccount && paymentAccount.balance_amt} VND</p>    
            </div>
           <div className="text-4xl font-extrabold flex justify-between py-2">
                <p>Quản lý tài khoản thanh toán</p>
                <button className="flex items-center justify-center px-3 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-xl"
                        onClick={addAmt}>
                    <FontAwesomeIcon icon={faPlus} className="" />
                </button>
            </div>
            <ReactTable 
                data={paymentHistory}
                columns={columns}
                defaultPageSize={10}
                filterable={true}
                defaultFilterMethod={filterMethod}
                minRows={10}
                />
        </div>
    </>
}