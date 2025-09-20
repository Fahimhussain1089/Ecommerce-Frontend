import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
// import { useEffect } from "react";
import { useEffect, useState } from "react";

 import { fetchCategories, fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import Paginations from "../shared/Paginations";
import DemoData from "../utils/DemoData";


const Home = () => {
    const dispatch = useDispatch();
    // const {products} = useSelector((state) => state.products);//when server will be run . then uncomment it 
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);

//------------------------demo data with demo category ------------------------------
   //useProductFilter(); //to run the queryString //same work of both
    // ⚡ Add a flag to control demo mode
    const [useDemo, setUseDemo] = useState(true);
     useEffect(() => {
        if (!useDemo) {
            dispatch(fetchCategories());
            // dispatch(fetchProducts());
        }
    }, [dispatch, useDemo]);

    // useEffect(() => {
    //        dispatch(fetchCategories());
    //    }, [dispatch]);

 const pagination = {
        totalPages: 10,        // pretend there are 5 pages
        totalElements: 50,    // pretend total 50 products
    };

    return (
        <div className="lg:px-4 sm:px-8 px-4">
            <div className="py-">
                <HeroBanner />
            </div>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold"> Products</h1>
                        <span className="text-slate-700">
                            Discover our handpicked selection of top-rated items just for you!
                        </span>
                    
                </div>
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
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {
                                // products && products.map((item,i) => <ProductCard key={i}{...item}/>)
                                DemoData && DemoData.map((item,i) => <ProductCard key={i} {...item}/>)
                            }
                        
                        </div>

                       

                        )
                }

                            {/* <div className="flex justify-center pt-10">
                                <Paginations
                                        numberOfPage = {pagination?.totalPages}
                                        totalProducts = {pagination?.totalElements}/>
                            </div> */}



            </div>            

                    
                
            
        </div>
    )
}

export default Home;