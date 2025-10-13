import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';

// import { addPaymentMethod } from '../../store/actions';
 import { addPaymentMethod, createUserCart } from '../../store/actions';



const PaymentMethod = () => {

    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);


   useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => {
                return {
                    // productId: item.productId,
                     // Send all product details
                id: item.id,
                productId: item.productId || item.id,
                name: item.name || item.productName,
                price: item.price,
                image: item.image,
                description: item.description,
                discount: item.discount,
                specialPrice: item.specialPrice,
                quantity: item.quantity || 1,
                };
            });
            console.log("Sending cart items:", sendCartItems); // Debug log

            
            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId]);

    const paymentMethodHandler = (method) => {
      console.log("payment methode => ",method)
        dispatch(addPaymentMethod(method));
    }


  return ( 
    <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border'>
      <h1 className='text-2xl font-semibold mb-4'>Select Payment Method</h1>
      <FormControl>
            <RadioGroup
                aria-label="payment method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => paymentMethodHandler(e.target.value)}
            >
                <FormControlLabel 
                    value="Stripe" 
                    control={<Radio color='primary' />} 
                    label="Stripe" 
                    className='text-gray-700'/>

                <FormControlLabel 
                    value="Paypal" 
                    control={<Radio color='primary' />} 
                    label="Paypal" 
                    className='text-gray-700'/>
            </RadioGroup>
        </FormControl>
    </div>
  )
}

export default PaymentMethod
