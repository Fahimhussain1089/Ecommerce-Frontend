import { Form } from "react-router-dom";
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";


const Contact = () => {
  return (
    <div
    //   className="flex flex-col items-center justify-center min-h-screen py-12 bg-center"
      className="flex flex-col items-center justify-center min-h-screen py-12 bg-center bg-no-repeat bg-contain"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/6632421/pexels-photo-6632421.jpeg?_gl=1*6z07m6*_ga*MTA3MzkwNjQ1NC4xNzU4MzYxMDcz*_ga_8JE65Q40S6*czE3NTgzNjEwNzIkbzEkZzEkdDE3NTgzNjIwMjUkajU3JGwwJGgw')" }}
    >
      {/* 3D Card Container */}
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl transform transition duration-500 hover:rotate-y-6 hover:-rotate-x-3 hover:shadow-2xl"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
        <p className="text-gray-600 text-center mb-4">
          We would love to hear from you! Please fill out the form below or
          contact us directly.
        </p>

        {/* Plain Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          {/*  */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          {/*  */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          {/*  */}
          {/* <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 duration-300">
            Send message
          </button> */}
          <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg 
                shadow-[0_4px_0_0_rgba(255,255,255,0.6)] 
                hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(255,255,255,0.6)] 
                active:translate-y-1 active:shadow-[0_2px_0_0_rgba(255,255,255,0.6)] 
                transform transition-all duration-200"
                >
                Send message
            </button>

          {/*  */}
          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold">Contact Information </h2>
            <div className="flex flex-col items-center space-y-2 mt-4">
                <div className="flex text-center">
                    <FaPhone className="text-blue-500 mr-2"></FaPhone>
                    <span className="text-gray-600">+91-9643159919</span>
                </div>
                {/*  */}
                <div className="flex text-center">
                    <FaEnvelope className="text-blue-500 mr-2"></FaEnvelope>
                    <span className="text-gray-600">ComingSoon@gmail.com</span>

                </div>
                {/*  */}
                <div className="flex text-center">
                    <FaMapMarkedAlt className="text-blue-500 mr-2"></FaMapMarkedAlt>
                    <span className="text-gray-600"> Gautam buddha Nagar Noida Sector 58 Ghaziabad</span>
                    
                </div>


            </div>
          </div>
          {/*  */}
        </form>
      </div>
    </div>
  );
};

export default Contact;

