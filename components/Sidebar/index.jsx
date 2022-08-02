import React from 'react'
import styles from "./index.module.css"
import {VscGraph} from 'react-icons/vsc'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {AiOutlineUser} from 'react-icons/ai'
import {BiNotepad} from 'react-icons/bi'
import {RiSettingsFill} from 'react-icons/ri'
import logoutUser from "../../utils/logout-user"


function Sidebar({mobile_menu}) {
  return (
    <div className={`${styles.sidebar} ${mobile_menu && styles.sidebar_enable} py-3 flex flex-col justify-between dark:bg-gray-900/60 backdrop-blur-xl  bg-gray-100/60 shadow-xl sm:shadow-none`}>
        <div className={`${styles.sidebar_header} py-6 text-left text-xl px-3 font-bold flex items-center`}>
           <span><img src="/brand.png" alt="brand-logo" className='w-8 h-8'/></span>
            {/* <h3 className='ml-6'>Admin</h3> */}
        </div>

        <div className="sidbar-pages px-3 mt-5 flex flex-col gap-6  text-gray-400 flex-end flex-1 items-start">
            <div className="sidebar-page-item flex items-center gap-3 justify-start text ">
                <span className='text-green-400'><VscGraph/></span>
                <p className='dark:text-white text-black'>Overview</p>
            </div>
            <div className="sidebar-page-item flex items-center gap-3 justify-start text">
                <span><MdProductionQuantityLimits/></span>
                <p>Product</p>
            </div>
            <div className="sidebar-page-item flex items-center gap-3 justify-start text ">
                <span><AiOutlineUser/></span>
                <p>Customers</p>
            </div>
            <div className="sidebar-page-item flex items-center gap-3 justify-start text">
                <span><BiNotepad/></span>
                <p>Orders</p>
            </div>
            <div className="sidebar-page-item flex items-center gap-3 justify-start text">
                <span><RiSettingsFill/></span>
                <p>Settings</p>
            </div>
        </div>
        <div className="sidebar-footer flex flex-col items-start gap-8 px-3 mb-12">
            <a href="#">Contact developer</a>
            <button onClick={()=>{
                logoutUser();
            }}>Logout</button>
        </div>

    </div>
  )
}

export default Sidebar