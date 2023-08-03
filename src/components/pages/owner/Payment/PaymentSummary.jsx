import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { AuthContext } from '../../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPayment, addAmtToPayment, getPaymentHistory } from "../../../../api/owner/payment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
const fixedAmt = 1000000;

const columns = [
    {
        Header: 'Thời gian bắt đầu',
        accessor: 'dateBegin'
    },
    {
        Header: 'Khoảng thời gian nâng cấp (days)',
        accessor: 'duration'
    },
    {
    Header: 'Lượng tiền trả',
    accessor: 'total_amt',
    Cell: props => <span className='number'>{props.row.total_amt} (VND)</span>
  }, {
    Header: 'Giảm giá',
    accessor: 'discount_amt',
    Cell: props => <span className='number'>{props.row.discount_amt} (VND)</span> // Tùy biến component Cell.
  },
  {
    Header: 'Tổng số dư còn lại',
    accessor: 'balance_amt',
    Cell: props => <span className='number'>{props.row.balance_amt} (VND)</span> // Tùy biến component Cell.
  },
  {
    Header: 'Ghi chú',
    accessor: 'remark'
  },
  {
    Header: 'Thời gian tạo',
    accessor: 'createdAt'
  }
]

const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
}

export default function PaymentSummary() {
    const navigate = useNavigate();
    const {token, user} = useContext(AuthContext);
    const [paymentHistory, setPaymentHistory] = useState([]);
   
    const fetchPaymentHistoryData = async () => {
        const result = await getPaymentHistory(token);
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
        await fetchPaymentHistoryData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <div className="w-full">     
            
           <div className="text-4xl font-extrabold flex justify-between py-2">
                <p>Quản lý lịch sử nâng cấp</p>
                
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