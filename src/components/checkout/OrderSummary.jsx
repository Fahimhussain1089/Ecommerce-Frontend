import React from 'react'
import { formatPriceCalculation } from '../utils/formatPrice'
// import { formatPriceCalculation } from '../../utils/formatPrice'


const OrderSummary = ({ totalPrice, cart, address, paymentMethod}) => {
  return (
    <div className="container mx-auto px-4 mb-8">
     <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 pr-4">
       <div className="space-y-4">
        <div className="p-4 border rounded-lg shadow-xs">
            <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
            <p>
                <strong>Building Name: </strong>
                {address?.buildingName}
            </p>
            <p>
                <strong>City: </strong>
                {address?.city}
            </p>
            <p>
                <strong>Street: </strong>
                {address?.street}
            </p>
            <p>
                <strong>State: </strong>
                {address?.state}
            </p>
            <p>
                <strong>Pincode: </strong>
                {address?.pincode}
            </p>
            <p>
                <strong>Country: </strong>
                {address?.country}
            </p>
        </div>
        <div className='p-4 border rounded-lg shadow-xs'>
            <h2 className='text-2xl font-semibold mb-2'>
                Payment Method
            </h2>
            <p>
                <strong>Method: </strong>
                {paymentMethod}
            </p>
        </div>
        {/* comment out when the server is working  */}

        {/* <div className='pb-4 border rounded-lg shadow-xs mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
            <div className='space-y-2'>
                {cart?.map((item) => (
                    <div key={item?.productId} className='flex items-center'>
                        <img src={`${import.meta.env.VITE_BACK_END_URL}/images/${
                            item?.image
                        }`}
                       // alt='Product'
                        className='w-12 h-12 rounded-sm'></img>
                    <div className='text-gray-500'>
                        <p>{item?.name}</p>
                        <p>
                          {item?.quantity} x ${item?.price} = ${// price ~= specialPrice change it int
                              formatPriceCalculation(item?.quantity, item?.price)// price ~= specialPrice change it int
                          }
                        </p>
                    </div>
                    </div>
                ))}
            </div> */}

              {/* comment out when server is working  */}
              <div className='p-4 border rounded-lg shadow-xs mb-6'>
                <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
                <div className='space-y-4'>
                  {cart?.map((item, index) => (
                    <div key={item?.productId || item?.id || index} className='flex items-center space-x-4 p-3 border rounded-lg'>
                      <img 
                        src={item?.image} // ✅ Use image URL directly from localStorage
                        alt={item?.name || 'Product'}
                        className='w-16 h-16 rounded-sm object-cover'
                        onError={(e) => {
                          e.target.src = "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                      <div className='flex-1'>
                        <p className='font-semibold text-lg'>{item?.name}</p>
                        <p className='text-gray-600'>
                          {item?.quantity} x ${item?.specialPrice || item?.price} = $
                          {formatPriceCalculation(item?.quantity, item?.specialPrice || item?.price)}
                        </p>
                        {item?.description && (
                          <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
                            {item?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
        
              {/* comment out when server is working  */}

        </div>
       </div>
      </div>


      <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-xs p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
        </div>
        </div>
    </div>

    </div>
  )
}

export default OrderSummary
