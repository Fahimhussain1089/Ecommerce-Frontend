import api from "../../api/api";

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
//----------------------when user backend server run then uncomment it ----------------------
// export const addToCart = (data, qty = 1, toast) => 
//     (dispatch, getState) => {
        // Find the product
        // const { products } = getState().products;
        // const getProduct = products.find(
        //     (item) => item.productId === data.productId
        // );
        // Check for stocks
        // const isQuantityExist = getProduct.quantity >= qty;
        // If in stock -> add
//         if (isQuantityExist) {
//             dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
//             toast.success(`${data?.productName} added to the cart`);
//             localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//         } else {
//             // error
//             toast.error("Out of stock");
//         }
// };

export const addToCart = (product, qty = 1, toast) => (dispatch, getState) => {
    // Check stock directly from the passed product
    const isQuantityExist = product.quantity >= qty;

    if (isQuantityExist) {
        dispatch({ type: "ADD_CART", payload: { ...product, quantity: qty } });

        toast.success(`${product.productName} added to the cart`);
        
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
        toast.error("Out of stock");
    }
};


// export const increaseCartQuantity = 
//     (data, toast, currentQuantity, setCurrentQuantity) =>
//     (dispatch, getState) => {
//         // Find the product
//         const { products } = getState().Demo;
        
//         const getProduct = products.find(
//             (item) => item.productId === data.productId
//         );

//         const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

//         if (isQuantityExist) {
//             const newQuantity = currentQuantity + 1;
//             setCurrentQuantity(newQuantity);

//             dispatch({
//                 type: "ADD_CART",
//                 payload: {...data, quantity: newQuantity + 1 },
//             });
//             localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//         } else {
//             toast.error("Quantity Reached to Limit");
//         }

//     };


// export const decreaseCartQuantity = 
//     (data, newQuantity) => (dispatch, getState) => {
//         dispatch({
//             type: "ADD_CART",
//             payload: {...data, quantity: newQuantity},
//         });
//         localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     }
export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Instead of reading from backend, assume unlimited demo stock
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity: newQuantity },
        });

        toast.success(`Quantity increased to ${newQuantity}`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const decreaseCartQuantity = 
    (data, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        if (currentQuantity <= 1) return; // don't go below 1

        const newQuantity = currentQuantity - 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity: newQuantity },
        });

        toast.success(`Quantity decreased to ${newQuantity}`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };


export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

