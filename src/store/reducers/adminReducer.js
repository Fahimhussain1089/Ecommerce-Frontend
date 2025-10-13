const initialState = {
    analytics: {
    productCount: 0,
    totalRevenue: 0,
    totalOrders: 0,//this three field may not more neccerary
    },
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ANALYTICS":
            return {
                ...state,
                analytics: action.payload,
            };
            
        default:
            return state;
    }
};
