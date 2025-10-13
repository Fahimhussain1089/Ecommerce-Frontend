import React, { useEffect } from 'react'
import { MdAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';
import { analyticsAction } from '../../../store/actions';
import { FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import DashboardOverview from './DashboardOverview';




const Dashboard = () => {
  const dispatch = useDispatch();
  const {isLoading, errorMessage} = useSelector((state) => state.errors);
  // for the demo 
   const {productCount,totalRevenue, totalOrders } = {productCount:"13" , totalRevenue:"45634.0",totalOrders:"43525"}
  // const { 
  //   analytics: { productCount, totalRevenue, totalOrders }
  //  } = useSelector((state) => state.admin); //uncomment it when you payment gateway integrate . 

  // const { productCount, totalRevenue, totalOrders } = useSelector((state) => state.admin.analytics ?? {});


   useEffect(() => {
  //   dispatch(analyticsAction());//uncomment it when you payment gateway integrate . 
   }, [dispatch]);

   if (isLoading) {
    return <Loader />
   }

   if (errorMessage) {
    return <ErrorPage message={errorMessage}/>;
   }

  return (
    <div>
      <div className='flex md:flex-row mt-8 flex-col lg:justify-between border border-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg'>
         <DashboardOverview
              title="Total Products"
              amount={productCount}
              Icon={FaBoxOpen}
            />

            <DashboardOverview 
              title="Total Orders"
              amount={totalOrders}
              Icon={FaShoppingCart}
            />

            <DashboardOverview 
              title="Total Revenue"
              amount={totalRevenue}
              Icon={FaDollarSign}
              revenue
            />


      </div>
    </div>
  )

}


export default Dashboard;
