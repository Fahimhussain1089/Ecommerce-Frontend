import api from "../../api/api";
import toast from 'react-hot-toast'; // ✅ Add this import

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
         });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
         });
    }
};

export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity + 1 },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };



export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders data",
         });
    }
};
// export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {
//     try {
//         dispatch({ type: "IS_FETCHING" });
        
//         const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
//         const token = localStorage.getItem('authToken');
        
//         console.log('🔄 Fetching orders...');
//         console.log('Endpoint:', endpoint);
//         console.log('Token available:', !!token);
        
//         if (!token) {
//             throw new Error('No authentication token found. Please login first.');
//         }

//         const { data } = await api.get(`${endpoint}?${queryString}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
        
//         dispatch({
//             type: "GET_ADMIN_ORDERS",
//             payload: data.content,
//             pageNumber: data.pageNumber,
//             pageSize: data.pageSize,
//             totalElements: data.totalElements,
//             totalPages: data.totalPages,
//             lastPage: data.lastPage,
//         });
//         dispatch({ type: "IS_SUCCESS" });
        
//     } catch (error) {
//         console.log('❌ Order fetch error:', error);
//         console.log('Error status:', error.response?.status);
//         console.log('Error message:', error.response?.data?.message);
        
//         dispatch({ 
//             type: "IS_ERROR",
//             payload: error?.response?.data?.message || error.message || "Failed to fetch orders data",
//         });
//     }
// };

//----------------------when user backend server run then uncomment it ----------------------
export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        // Check for stocks
        const isQuantityExist = getProduct.quantity >= qty;
        // If in stock -> add
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            // error
            toast.error("Out of stock");
        }
};
// export const addToCart = (data, qty = 1, toast) => 
//     (dispatch, getState) => {
//         // Find the product
//         const { products } = getState().products;
//         const getProduct = products.find(
//             (item) => item.productId === data.productId
//         );

//         // Check for stocks
//         const isQuantityExist = getProduct.quantity >= qty;

//         // If in stock -> add
//         if (isQuantityExist) {
//             dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
//             toast.success(`${data?.productName} added to the cart`);
//             localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//         } else {
//             // error
//             toast.error("Out of stock");
//         }
// };




export const authenticateSignInUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
}

///un comment it when backend server is working . 
export const registerNewUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};

///un comment it when backend server is working . 
export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type:"LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
};

///un comment it when backend server is working . 
export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};


export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};
///un comment it when backend server is working . 

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
         });
    }
};
///un comment it when backend server is working . 

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');
        
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
         });
    }
};


// /un comment it when backend server is working . 
export const deleteUserAddress = 
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occured",
         });
    } finally {
        setOpenDeleteModal(false);
    }
};
export const analyticsAction = () => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING"});
            const { data } = await api.get('/admin/app/analytics');
            dispatch({
                type: "FETCH_ANALYTICS",
                payload: data,
            })
            dispatch({ type: "IS_SUCCESS"});
        } catch (error) {
            dispatch({ 
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch analytics data",
            });
        }
};


export const updateProductImageFromDashboard = 
    (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${productId}/image`, formData);
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed");
     
    }
};

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };
    export const deleteProduct = 
        (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) => {
        try {
            setLoader(true)
            const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
            await api.delete(`${endpoint}${productId}`);
            toast.success("Product deleted successfully");
            setLoader(false);
            setOpenDeleteModal(false);
            await dispatch(dashboardProductsAction());
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Some Error Occured"
            )
        }
    };


export const dashboardProductsAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
         });
    }
};

export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${sendData.id}`, sendData);
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product update failed");
     
    }
};


//______________demy data to check start__________
export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });

    try {
        // Get existing addresses from localStorage
        let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

        if (!addressId) {
            // Create new dummy address
            const newAddress = {
                id: addresses.length + 1,
                ...sendData,
            };
            addresses.push(newAddress);
            toast.success("Address added successfully (Dummy)");
        } else {
            // Update existing address
            addresses = addresses.map((addr) =>
                addr.id === addressId ? { ...addr, ...sendData } : addr
            );
            toast.success("Address updated successfully (Dummy)");
        }

        // Save back into localStorage
        localStorage.setItem("addresses", JSON.stringify(addresses));

        // Dispatch dummy addresses
        dispatch({ type: "SET_ADDRESSES", payload: addresses });

        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error("Internal Error (Dummy Address)");
        dispatch({ type: "IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};
// Dummy action to get user addresses
export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "BUTTON_LOADER" });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get addresses from localStorage - use the correct key
    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

    
    console.log("Addresses from localStorage:", addresses); // Debug log
    
    dispatch({ type: "SET_ADDRESSES", payload: addresses });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "IS_ERROR", payload: "Failed to fetch addresses" });
  }
};





export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};




export const createStripePaymentSecret = (sendData) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        
        // Fake API response
        const data = { clientSecret: "dummy_client_secret_12345" };
        
        // Simulate delay
        await new Promise((res) => setTimeout(res, 500));

        dispatch({ type: "CLIENT_SECRET", payload: data });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error("Failed to create client secret");
    }
};

export const stripePaymentConfirmation = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch) => {
    try {
        // Fake API response
        const response = { data: { status: "success" } };
        
        // Simulate delay
        await new Promise((res) => setTimeout(res, 500));

        if (response.data) {
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            toast.success("Order Accepted");
        } else {
            setErrorMesssage("Payment Failed. Please try again.");
        }
    } catch (error) {
        setErrorMesssage("Payment Failed. Please try again.");
    }
};



export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/orders/" : "/seller/orders/";
        const { data } = await api.put(`${endpoint}${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        await dispatch(getOrdersForDashboard());
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false)
    }
};

export const addNewProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async(dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
            await api.post(`${endpoint}${sendData.categoryId}/product`,
                sendData
            );
            toast.success("Product created successfully");
            reset();
            setOpen(false);
            await dispatch(dashboardProductsAction());
        } catch (error) {
            console.error(err);
            toast.error(err?.response?.data?.description || "Product creation failed");
        } finally {
            setLoader(false);
        }
    }

// export const updateProductImageFromDashboard = 
//     (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
//     try {
//         setLoader(true);
//         const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
//         await api.put(`${endpoint}${productId}/image`, formData);
//         toast.success("Image upload successful");
//         setLoader(false);
//         setOpen(false);
//         await dispatch(dashboardProductsAction());
//     } catch (error) {
//         toast.error(error?.response?.data?.description || "Product Image upload failed");
     
//     }
// };




  export const getAllSellersDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/sellers?${queryString}`);
      dispatch({
        type: "GET_SELLERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    }
  };

export const addNewDashboardSeller =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/auth/signup", sendData);
      reset();
      toast.success("Seller registered successfully!");

      await dispatch(getAllSellersDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
      setOpen(false);
    }
  };


//______________demy data to check end __________________



// export const createStripePaymentSecret 
//     = (sendData) => async (dispatch, getState) => {
//         try {
//             dispatch({ type: "IS_FETCHING" });
//             const { data } = await api.post("/order/stripe-client-secret", sendData);
//             dispatch({ type: "CLIENT_SECRET", payload: data });
//               localStorage.setItem("client-secret", JSON.stringify(data));
//               dispatch({ type: "IS_SUCCESS" });
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || "Failed to create client secret");
//         }
// };


// export const stripePaymentConfirmation 
//     = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
//         try {
//             const response  = await api.post("/order/users/payments/online", sendData);
//             if (response.data) {
//                 localStorage.removeItem("CHECKOUT_ADDRESS");
//                 localStorage.removeItem("cartItems");
//                 localStorage.removeItem("client-secret");
//                 dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS"});
//                 dispatch({ type: "CLEAR_CART"});
//                 toast.success("Order Accepted");
//               } else {
//                 setErrorMesssage("Payment Failed. Please try again.");
//               }
//         } catch (error) {
//             setErrorMesssage("Payment Failed. Please try again.");
//         }
// };


// Dummy Cart Actions for Frontend Testing
// export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
//     try {
//         dispatch({ type: "IS_FETCHING" });
        
//         // Simulate API delay
//         await new Promise((resolve) => setTimeout(resolve, 800));
        
//         // Get current user from auth state or localStorage
//         const auth = JSON.parse(localStorage.getItem("auth")) || getState().auth.user;
//         if (!auth) {
//             toast.error("Please login first (Dummy)");
//             dispatch({ type: "IS_ERROR", payload: "User not authenticated" });
//             return;
//         }
        
//         // Get current cart from localStorage or create empty array
//         let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        
//         // Add new cart items with proper structure
//         const newCartItems = sendCartItems.map(item => ({
//             id: item.productId || item.id, // Use productId or id
//             productId: item.productId || item.id,
//             name: item.name,
//             price: item.price,
//             image: item.image,
//             quantity: item.quantity || 1,
//             cartItemId: Date.now() + Math.random(), // Unique cart item ID
//             userId: auth.id, // Link to current user
//             addedAt: new Date().toISOString()
//         }));
        
//         // Check if item already exists in cart, then update quantity
//         newCartItems.forEach(newItem => {
//             const existingItemIndex = cartItems.findIndex(
//                 existingItem => existingItem.productId === newItem.productId && existingItem.userId === auth.id
//             );
            
//             if (existingItemIndex !== -1) {
//                 // Update quantity if item exists
//                 cartItems[existingItemIndex].quantity += newItem.quantity;
//             } else {
//                 // Add new item if doesn't exist
//                 cartItems.push(newItem);
//             }
//         });
        
//         // Save to localStorage
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
        
//         // Dispatch success
//         dispatch({ type: "IS_SUCCESS" });
//         await dispatch(getUserCart()); // Refresh cart
//         toast.success("Items added to cart successfully (Dummy)");
        
//     } catch (error) {
//         console.log(error);
//         dispatch({ 
//             type: "IS_ERROR",
//             payload: "Failed to add items to cart (Dummy)",
//         });
//     }
// };

// export const getUserCart = () => async (dispatch, getState) => {
//     try {
//         dispatch({ type: "IS_FETCHING" });
        
//         // Simulate API delay
//         await new Promise((resolve) => setTimeout(resolve, 500));
        
//         // Get current user
//         const auth = JSON.parse(localStorage.getItem("auth")) || getState().auth.user;
//         if (!auth) {
//             dispatch({ type: "IS_ERROR", payload: "User not authenticated" });
//             return;
//         }
        
//         // Get cart from localStorage for this user
//         let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//         const userCartItems = cartItems.filter(item => item.userId === auth.id);
        
//         console.log("User cart items from localStorage:", userCartItems); // Debug
        
//         // Calculate total price
//         const totalPrice = userCartItems.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);
        
//         // Generate a dummy cart ID
//         const cartId = `dummy-cart-${auth.id}-${Date.now()}`;
        
//         // Dispatch to Redux store (matching your original structure)
//         dispatch({
//             type: "GET_USER_CART_PRODUCTS",
//             payload: userCartItems, // products array
//             totalPrice: totalPrice,
//             cartId: cartId
//         });
        
//         // Also save to localStorage for consistency
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
        
//         dispatch({ type: "IS_SUCCESS" });
        
//     } catch (error) {
//         console.log(error);
//         dispatch({ 
//             type: "IS_ERROR",
//             payload: "Failed to fetch cart items (Dummy)",
//         });
//     }
// };


//______________________✅ Dummy Register Function-start----------------------------------
// export const registerNewUser 
//     = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
//         try {
//             setLoader(true);

//             // Simulate API delay
//             await new Promise((res) => setTimeout(res, 800));

//             // Get existing users from localStorage
//             let users = JSON.parse(localStorage.getItem("users")) || [];

//             // Check if user already exists
//             const isExist = users.find(
//                 (u) => u.email === sendData.email || u.username === sendData.username
//             );

//             if (isExist) {
//                 toast.error("User already exists with this email/username");
//                 setLoader(false);
//                 return;
//             }

//             // Create new dummy user
//             const newUser = {
//                 id: users.length + 1,
//                 username: sendData.username,
//                 email: sendData.email,
//                 password: sendData.password, // (⚠️ only for dummy, don’t save plain text in real app)
//                 token: "dummy-jwt-token-" + Date.now(),
//             };

//             // Save in localStorage
//             users.push(newUser);
//             localStorage.setItem("users", JSON.stringify(users));

//             // Dispatch dummy user register
//             dispatch({ type: "REGISTER_USER", payload: newUser });

//             reset();
//             toast.success("User registered successfully (Dummy)");
//             navigate("/login");

//         } catch (error) {
//             console.log(error);
//             toast.error("Internal Error");
//         } finally {
//             setLoader(false);
//         }
// };

//______________________✅ And update your Login (Dummy Auth) to read from localStorage----------------------


// export const authenticateSignInUser 
//     = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
//         try {
//             setLoader(true);

//             // Simulate API delay
//             await new Promise((res) => setTimeout(res, 800));

//             let users = JSON.parse(localStorage.getItem("users")) || [];

//             const matchedUser = users.find(
//                 (u) => 
//                     u.username === sendData.username && 
//                     u.password === sendData.password
//             );

//             if (matchedUser) {
//                 dispatch({ type: "LOGIN_USER", payload: matchedUser });
//                 localStorage.setItem("auth", JSON.stringify(matchedUser));

//                 reset();
//                 toast.success("Login Success (Dummy Auth)");
//                 navigate("/");
//             } else {
//                 toast.error("Invalid username or password");
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error("Internal Error");
//         } finally {
//             setLoader(false);
//         }
// };
///______________________✅ And update your Login (Dummy Auth) to read from localStorage----END------------------


// export const logOutUser = (navigate) => (dispatch) => {
//     dispatch({ type:"LOG_OUT" });
//     localStorage.removeItem("auth");
//     navigate("/login");
// };

//

// export const addUpdateUserAddress =
//      (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
//     /*
//     const { user } = getState().auth;
//     await api.post(`/addresses`, sendData, {
//           headers: { Authorization: "Bearer " + user.jwtToken },
//         });
//     */
//     dispatch({ type:"BUTTON_LOADER" });
//     try {
//         if (!addressId) {
//             const { data } = await api.post("/addresses", sendData);
//         } else {
//             await api.put(`/addresses/${addressId}`, sendData);
//         }
//         dispatch(getUserAddresses());
//         toast.success("Address saved successfully");
//         dispatch({ type:"IS_SUCCESS" });
//     } catch (error) {
//         console.log(error);
//         toast.error(error?.response?.data?.message || "Internal Server Error");
//         dispatch({ type:"IS_ERROR", payload: null });
//     } finally {
//         setOpenAddressModal(false);
//     }
// };


///-------------authencate with demy data -------------------------------------
// export const authenticateSignInUser 
//     = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
//         try {
//             setLoader(true);

//             // 🟢 Hardcoded authentication
//            if ((sendData.username === "fahim" && sendData.password === "fahim123")
// ) {
//                 const fakeUser = {
//                     id: 1,
//                     username: "fahim",
//                     token: "dummy-jwt-token-12345",
//                 };
//                 // simulate API delay
//                 await new Promise((res) => setTimeout(res, 800));

//                 dispatch({ type: "LOGIN_USER", payload: fakeUser });
//                 localStorage.setItem("auth", JSON.stringify(fakeUser));

//                 reset();
//                 toast.success("Login Success (Dummy Auth)");
//                 navigate("/");
//             } else {
//                 toast.error("Invalid username or password");
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error("Internal Error");
//         } finally {
//             console.log("finally block executed or set the value false ")
//             setLoader(false);
//         }
// }
//-------------authencate with demy data End -------------------------------------


// export const decreaseCartQuantity = 
//     (data, newQuantity) => (dispatch, getState) => {
//         dispatch({
//             type: "ADD_CART",
//             payload: {...data, quantity: newQuantity},
//         });
//         localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     }
// export const increaseCartQuantity = 
//     (data, toast, currentQuantity, setCurrentQuantity) =>
//     (dispatch, getState) => {
//         // Instead of reading from backend, assume unlimited demo stock
//         const newQuantity = currentQuantity + 1;
//         setCurrentQuantity(newQuantity);

//         dispatch({
//             type: "ADD_CART",
//             payload: { ...data, quantity: newQuantity },
//         });

//         toast.success(`Quantity increased to ${newQuantity}`);
//         localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     };

// export const decreaseCartQuantity = 
//     (data, currentQuantity, setCurrentQuantity) =>
//     (dispatch, getState) => {
//         if (currentQuantity <= 1) return; // don't go below 1

//         const newQuantity = currentQuantity - 1;
//         setCurrentQuantity(newQuantity);
 
//         dispatch({
//             type: "ADD_CART",
//             payload: { ...data, quantity: newQuantity },
//         });

//         toast.success(`Quantity decreased to ${newQuantity}`);
//         localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     };


// export const addToCart = (product, qty = 1, toast) => (dispatch, getState) => {
//     // Check stock directly from the passed product
//     const isQuantityExist = product.quantity >= qty;

//     if (isQuantityExist) {
//         dispatch({ type: "ADD_CART", payload: { ...product, quantity: qty } });

//         toast.success(`${product.productName} added to the cart`);
        
//         localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     } else {
//         toast.error("Out of stock");
//     }
// };