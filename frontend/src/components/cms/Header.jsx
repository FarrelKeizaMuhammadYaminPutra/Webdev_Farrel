import React from "react";
import { GoBell } from "react-icons/go";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";


const Header = () => {
  const {  user, logout } = useAuthStore();
  
    const handleLogout = () => {
      logout();
    };
  return (
    <div className="flex justify-between items-center p-4 ">
      <div>
        <h1 className="text-xs">Welcome Back!</h1>
        <p className="text-xl font-semibold">{user.name}</p>
      </div>
      <div className="flex item-centers space-x-5">
        <div className="flex items-center space-x-5">
          <motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-250'
				>
					Logout
				</motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;
