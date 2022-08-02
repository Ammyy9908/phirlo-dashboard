import React from 'react'
import {BsBell} from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'
import {BiMenu} from 'react-icons/bi'
import styles from './index.module.css'
import { connect } from 'react-redux'

function Header({setMobileMenu,mobile_menu,user}) {
  return (
    <div className={`${styles.main_header} mt-6 flex w-full justify-between md:justify-end sticky top-0 backdrop-blur-xl  py-3 bg-white dark:bg-black/50 items-center`}>
            
            
            <div className="main-header-right flex items-center gap-6">
              <button className="hidden md:flex alert-btn bg-purple-500 text-white w-8 h-8  items-center justify-center rounded-full">
                <BsBell/>
              </button>
              <div className="main-header-user-panel flex items-center gap-3 px-3 py-2 md:bg-gray-400 md:dark:bg-white md:dark:text-black rounded-full text-white cursor-pointer">
                {user && <div className="user-avatar w-8 h-8 bg-gray-400 rounded-full" style={{
                  backgroundImage: `url('${user.avatar}')`,
                  backgroundSize: 'cover'
                }}></div>}
                {user && <p className='hidden md:block'>{user.name}</p>}
                <span className='hidden md:block'><IoIosArrowDown/></span>
              </div>
            </div>
            <button onClick={()=>{
                setMobileMenu(!mobile_menu)
            }} className='md:hidden rounded-full dark:bg-white bg-gray-300 text-black w-12 h-12 flex items-center justify-center'><BiMenu/></button>
          </div>
  )
}
const mapStateToProps = (state) => ({
  user:state.appReducer.user
})
export default connect(mapStateToProps,null)(Header)