import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
 import Modal from '../../shared/Modal';
import {  Box } from '@mui/material';
import { adminOrderTableColumn } from '../../helper/tableColumn';
import UpdateOrderForm from './UpdateOrderForm';





const OrderTable = ({ adminOrder, pagination}) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );
  const columns = [// // ✅ required for the testing with my data type;
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'totalAmount', headerName: 'Total Amount', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'date', headerName: 'Order Date', width: 200 },
];

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

const tableRecords = adminOrder?.map((item) => {
  return {
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  }
});

const handlePaginationChange = (paginationModel) => {
  const page = paginationModel.page + 1;
  setCurrentPage(page);
  params.set("page", page.toString());
  navigate(`${pathname}?${params}`)
}

const handleEdit = (order) => {
  setSelectedItem(order);
  setUpdateOpenModal(true);
}

  return (
    <div>
      <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
        All Orders
      </h1>

      <div>
         <DataGrid
         className='w-full'
            rows={tableRecords}
            columns={adminOrderTableColumn(handleEdit)}
           // columns={columns}   // ✅ required for the testing with my data type;

            paginationMode='server'
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
          />
          
      </div>

      <Modal
       open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
          <UpdateOrderForm
            setOpen={setUpdateOpenModal}
            open={updateOpenModal}
            loader={loader}
            setLoader={setLoader}
            selectedId={selectedItem.id}
            selectedItem={selectedItem}
            />
      </Modal>

      
<Modal open={updateOpenModal} onClose={() => setUpdateOpenModal(false)}>
  <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2 }}>
    <h2>Update Order Status</h2>
    <UpdateOrderForm
      setOpen={setUpdateOpenModal}
      open={updateOpenModal}
      loader={loader}
      setLoader={setLoader}
      selectedId={selectedItem.id}
      selectedItem={selectedItem}
    />
  </Box>
</Modal>


    </div>
  )
}

export default OrderTable
