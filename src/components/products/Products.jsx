import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions";
import Filter from "./Filter";
import { fetchCategories } from "../../store/actions";
import Loader from "../shared/Loader";
import { useEffect, useState } from "react";   // ✅ import useState

import Paginations from "../shared/Paginations";
import useProductFilter from "../hooks/useProductFilter";
// import DemoData from "../utils/DemoData";

// import { demoCategories } from "../utils";



//change in the backend 279 lecture
// https://github.com/EmbarkXOfficial/spring-boot-course/blob/main/sb-ecom/src/main/java/com/ecommerce/project/service/ProductServiceImpl.java
// // getAllProduct 
// // productserviceImp 
// //productservice 
// // productReposity



// const Products =() => {
//     const {isLoading, errorMessage}  = useSelector(
//         (state) => state.errors,
//     )
//     // const  {products, categories, pagination} = useSelector(
//     //     (state)  => state.Products
//     // );           //uncomment it when you server would start a.

//     const dispatch = useDispatch();

//     //useProductFilter(); //to run the queryString //same work of both
//     // useEffect(() => {
//     //     dispatch(fetchProducts());
//     // },[dispatch]);//to check for the product queryString //same work of both


//      // ⚡ Demo mode flag
//     const [useDemo] = useState(true);

//     // Load only when NOT in demo mode
//     useEffect(() => {
//         if (!useDemo) {
//             dispatch(fetchCategories());
//             dispatch(fetchProducts());
//         }
//     }, [dispatch, useDemo]);

//     // useEffect(() => {
//     //     dispatch(fetchCategories());
//     // }, [dispatch]);

     

//     // const pagination = {
//     //     totalPages: 10,        // pretend there are 5 pages
//     //     totalElements: 50,    // pretend total 50 products
//     // };

//     return (
//         <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
//             <Filter  
//              categories={categories ? categories : []}
//             // categories={categories && categories.length > 0 ? categories : demoCategories} 
//            // categories={demoCategories}
//             />
//             {
//                 isLoading ? (
//                      <Loader text={"Data comming soon ..."}/>

//                 ) :

//                 errorMessage ? (
//                     <div className="flex justify-center items-center h-[200px]">
//                         <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
//                         <span className="text-slate-800 text-lg font-medium">
//                             {errorMessage}
//                         </span>
//                     </div>
//                 ) : (
//                     <div className="min-h-[700px]">
//                         <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
//                             {
//                              products && products.map((item,i) => <ProductCard key={i}{...item}/>)
//                            // DemoData && DemoData.map((item,i)=> <ProductCard key={i}{...item}/>)
//                             }

//                         </div>
//                         <div className="flex justify-center pt-10">
//                         <Paginations
//                                 numberOfPage = {pagination?.totalPages}
//                                 totalProducts = {pagination?.totalElements}/>
//                         </div>
//                     </div>
//                 )
//             }


//         </div>
//     );
// }

// export default Products;



const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter categories={categories ? categories : []}/>
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                       {
                         products && products.map((item,i) => <ProductCard key={i}{...item}
                         />
                        )}
                    </div>
                    <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage = {pagination?.totalPages}
                            totalProducts = {pagination?.totalElements}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;