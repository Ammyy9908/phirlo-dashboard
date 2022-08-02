
import Main from '../components/Main'
import BaseSeo from '../components/Seo/BaseSeo'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import {BiSearch} from 'react-icons/bi'
import Cookies from 'js-cookies'
import jwt_decode from "jwt-decode";
import {FiUsers} from 'react-icons/fi'
import {GiTwoCoins} from 'react-icons/gi'
import {AiFillBook} from 'react-icons/ai'
import {RiCouponLine} from 'react-icons/ri'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import React from 'react'
import { connect } from 'react-redux'
import getToken from '../utils/get-token'
import getUser from '../utils/get-admin'
import useAuth from '../hooks/useAuth'
import useConsignments from '../hooks/useConsignments'
import useCoupons from '../hooks/useCoupons'
import useWallets from '../hooks/useWallets'
import useConsignmentsDetails from '../hooks/useConsignmentsDetails'
import ConsignmentRow from '../components/ConsignmentRow/ConsignmentRow'
import logoutUser from '../utils/logout-user'
import getUserAnalytics from '../utils/get-user-analytics'
import getPointsAnalytics from '../utils/get-points-analytics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  width: '100%',
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Consignments  Activity',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const line_data = {
  labels,
  datasets: [
    {
      label: 'Active',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(1, 5, 254)',
      backgroundColor: 'rgba(1, 5, 254, 1)',
    },
    {
      label: 'Inactive',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(5, 254, 1)',
      backgroundColor: 'rgba(5, 254, 1, 1)',
    },
  ],
};

export const donut_data = {
  labels: ['Processing', 'Points Credited','Approved', 'Not Approved', 'Returned', 'Cancelled', 'Listed', 'Pending','Sold'],
  
};




 function Home({user,setUser,setConsignments,Consignments,alert,setUserAnalytics,user_analytics,setPoints,points_analytics}) {
  const [mobile_menu,setMobileMenu] = React.useState(false);
  const [mounted,setMounted] = React.useState(false);
  const [filteredResult,setFilteredResult] = React.useState(null);
  const [email,setEmail] = React.useState('');
  const [filter,setFilter] = React.useState('all');
  const [password,setPassword] = React.useState('');
  const authenticated = useAuth();
  const consignments = useConsignments();
  const coupons = useCoupons();
  const consignmentDetails = useConsignmentsDetails();
  const [keyword,setKeyword] = React.useState('');

  console.log("State Consignments",Consignments)
  console.log(consignments);
  console.log("Coupons: ",coupons);
  console.log("Consignment Details: ",consignmentDetails);
  


  React.useEffect(()=>{
    setMounted(true);
    if(Cookies.getItem('token')){
      
      const decoded = jwt_decode(Cookies.getItem('token'));
      const {email} = decoded;
      getUser(email).then((user)=>{
        console.log(user.getUser);
        setUser(user.getUser);
      }).catch((e)=>{
        console.log(e);
      })

      // get user anayltics

      getUserAnalytics().then((user_analytics)=>{
        console.log(user_analytics);
        setUserAnalytics(user_analytics.userAnalytics);
      }).catch((e)=>{
        console.log(e);
      })
    }

    // get points analytics

    getPointsAnalytics().then((points_analytics)=>{
      console.log(points_analytics);
      setPoints(points_analytics.pointsDetails);
    }).catch((e)=>{
      console.log(e);
    })

    if(consignments){
      setConsignments(consignments);
    }
   
  },[consignments]);

  if(!mounted){
    return null;
  }


  const handleFiltering = (e)=>{
    setFilter(e.target.value);
    if(e.target.value==="all"){
      setFilteredResult(null);
      return;
    }
    let filter_label = 'PENDING'
    switch(e.target.value){
      case 'Pending':
        filter_label = 'PENDING'
        break;
      case 'Approved':
        filter_label = 'APPROVED'
        break;
      case 'Not Approved':
        filter_label = 'NOT_APPROVED'
        break;
      case 'Returned':
        filter_label = 'RETURNED'
        break;
      case 'Cancelled':
        filter_label = 'CANCELLED'
        break;
      case 'Listed':
        filter_label = 'LISTED'
        break;
      case 'Sold':
        filter_label = 'SOLD'
        break;
      case 'Processing':
        filter_label = 'PROCESSING'
        break;
      case 'Points Credited':
        filter_label = 'POINTS_CREDITED'
        break;
        
    }
    console.log(filter_label);
    console.log(consignmentDetails.allConsignmentsDetails.filter((consignment)=>consignment.deliveryStatus===filter_label));
    setFilteredResult(consignmentDetails.allConsignmentsDetails.filter((consignment)=>consignment.deliveryStatus===filter_label));
  }


  // handle search consignments


  const handleSearch = (e)=>{
    setKeyword(e.target.value);
    if(e.target.value===""){
      setFilteredResult(null);
      return;
    }
    setFilteredResult(consignmentDetails.allConsignmentsDetails.filter((consignment)=>consignment.consignmentId.toString().includes(e.target.value) || consignment.name.toString().includes(e.target.value) ||consignment.consignmentName.toLowerCase().toString().includes(e.target.value.toLowerCase())));
  }

  /// handle admin login


  const handleLogin = (e)=>{
    e.preventDefault();
    getToken(email,password).then((data)=>{
      console.log("Data=>",data.tokenAuth);
      const token = data.tokenAuth.token;
     
        Cookies.setItem('token',token);
      
      window.location.reload();
    }).catch((e)=>{
      console.log(e);
    })
  }

  // count all points for the costInPoints

  const countPoints = (array)=>{

    let total = 0;
    array.forEach((coupon)=>{
      total += coupon.costInPoints;
    })
    return total;

  }


  console.log("Filter",filter)
  return (
    <div>
       <BaseSeo title="Sell" />

       {!authenticated && <div className={`${styles.non_auth_app}`}>
        <div className={styles.non_auth_wrapper}>
          <h1 className='text-3xl text-center'>Login as Admin</h1>
          <form className={styles.admin_form} onSubmit={handleLogin}>
            <div className="custom-field flex flex-col items-start gap-1 w-full">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder='Admin Email' value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }} className='w-full h-12 border-2 border-gray-300 rounded-md px-3'/>
            </div>
            <div className="custom-field">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder='Admin Password' value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} className='w-full h-12 border-2 border-gray-300 rounded-md px-3'/>
            </div>
            <input type="submit" value="Authenticate" className='px-3 py-2 bg-black text-white w-full mt-3 rounded-md h-12' />
          </form>
        </div>
       </div>}

       {authenticated && user && !user.isSuperuser && <div className={`${styles.non_auth_app} dark:bg-black`}>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-6xl'>🖐</p>
        <h1 className='text-3xl dark:text-white'>Only Members Allowed</h1>
        <button onClick={()=>{
          logoutUser();
        }} className="px-2 py-3 dark:text-white bg-black rounded-full dark:bg-indigo-700 text-white w-32 hover:translate-y-0.5 hover:shadow-xl">Exit</button>
        </div>
        </div>}

      {authenticated && user && user.isSuperuser && <div className={`${styles.app} dark:bg-black dark:text-white`}>




        <Sidebar mobile_menu={mobile_menu}/>
        <Main>
          <Header setMobileMenu={setMobileMenu} mobile_menu={mobile_menu}/>
              {/* {alert && <Alert/>} */}
          <div>
              <h1 className='text-3xl font-bold'>Welcome,admin</h1>
              <p className='font-semibold'>Here what's happening to your store today.</p>
            </div>
          {/* <!-Dashboard Shortcuts-> */}
          <div className="dashboard-shortcuts mt-12 mb-12 grid grid-cols-1 sm:grid-cols- md:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="shortcut-item py-6 px-2 dark:bg-blue-700 dark:text-white bg-blue-300 rounded-md cursor-pointer hover:shadow-2xl hover:scale-95">
              <div className="shortcut-item-header flex items-center gap-3 mb-6">
                <div className="shortcut-icon bg-black w-8 h-8 text-blue-300 flex items-center justify-center rounded-full"><FiUsers/></div>
                <p className='text-sm'>Total Users</p>
              </div>
              {user_analytics && <h2 className='text-4xl sm:text-5xl xl:text-6xl mb-3'>{user_analytics.totalUsers}</h2>}
              {user_analytics && <div className="shortcut-item-footer">
                <p className='flex  items-center gap-3'><span className='px-3 py-1 bg-white rounded-full flex items-center gap-2 dark:text-black'>Active <strong className='text-green-400'>{Math.round((user_analytics.totalActive/user_analytics.totalUsers)*100)}%</strong></span> <span className='px-3 py-1 bg-white rounded-full shadow-xl flex items-center gap-2 dark:text-black'>Inactive <strong className='text-red-500'>{Math.round((user_analytics.totalInactive/user_analytics.totalUsers)*100)}%</strong></span></p>
              </div>}
            </div>
            <div className="shortcut-item py-6 px-2 dark:bg-yellow-700 dark:text-white bg-yellow-300 rounded-md cursor-pointer hover:shadow-2xl hover:scale-95">
              <div className="shortcut-item-header flex items-center gap-3 mb-6">
                <div className="shortcut-icon bg-black w-8 h-8 text-yellow-300 flex items-center justify-center rounded-full"><AiFillBook/></div>
                <p className='text-sm'>Total Consignments</p>
              </div>
              {consignmentDetails && <h2 className='text-4xl sm:text-5xl xl:text-6xl mb-3'>{consignmentDetails.allConsignmentsDetails.length}</h2>}
              {consignmentDetails && <div className="shortcut-item-footer">
                <p className='flex  items-center gap-3'><span className='px-3 py-1 bg-white rounded-full flex items-center gap-2 dark:text-black'>Pending <strong className='text-gray-400'>{Math.round((consignmentDetails.totalPending/consignmentDetails.allConsignmentsDetails.length)*100)}%</strong></span> <span className='px-3 py-1 bg-white rounded-full shadow-xl flex items-center gap-2 dark:text-black'>Credited <strong className='text-green-500'>{consignmentDetails.totalTimesPointsCredited}%</strong></span></p>
              </div>}
            </div>
            {coupons && <div className="shortcut-item py-6 px-2 dark:bg-indigo-700 dark:text-white bg-indigo-300 rounded-md cursor-pointer hover:shadow-2xl hover:scale-95">
              <div className="shortcut-item-header flex items-center gap-3 mb-6">
                <div className="shortcut-icon bg-black w-8 h-8 text-indigo-300 flex items-center justify-center rounded-full"><RiCouponLine/></div>
                <p className='text-sm '>Total Coupons</p>
              </div>
              <h2 className='text-4xl sm:text-5xl xl:text-6xl mb-3'>{coupons.length}</h2>
              {coupons && <div className="shortcut-item-footer">
                <p className='flex  items-center gap-3'><span className='px-3 py-1 bg-white rounded-full flex items-center gap-2 dark:text-black'>Total Points <strong className='text-gray-400'>{countPoints(coupons)}</strong></span></p>
              </div>}
            </div>}
            <div className="shortcut-item py-6 px-2 dark:bg-red-700 dark:text-white bg-red-300 rounded-md cursor-pointer hover:shadow-2xl hover:scale-95">
              <div className="shortcut-item-header flex items-center gap-3 mb-6">
                <div className="shortcut-icon bg-black w-8 h-8 w-8 h-8 text-red-300 flex items-center justify-center rounded-full"><GiTwoCoins/></div>
                <p className='text-sm '>Total Points</p>
              </div>
              {points_analytics && <h2 className='text-4xl sm:text-5xl xl:text-6xl mb-3'>{points_analytics.totalBalancePoints}</h2>}
              {points_analytics && <div className="shortcut-item-footer">
                <p className='flex  items-center gap-3'><span className='px-3 py-1 bg-white rounded-full flex items-center gap-2 dark:text-black'>Avg. Points <strong className='text-gray-400'>{Math.round((parseInt(points_analytics.totalBalancePoints)/parseInt(points_analytics.totalWallets)))}</strong></span></p>
              </div>}
            </div>
            
            
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
            <div style={{position: "relative", width:"100%"}} className={`${styles.chart_container} dark:bg-gray-800 bg-gray-300 rounded-md flex flex-col justify-center`}>
            <Line options={options} data={line_data}/>
            </div>
          
          
         <div style={{position: "relative", width:"100%"}} className={`${styles.chart_container} dark:bg-gray-800 bg-gray-300 rounded-md pb-6`}>
         {Consignments && <Doughnut data={{...donut_data,datasets: [
    {
      label: '# of Votes',
      data: Consignments,
      backgroundColor: [
        'rgba(111, 5, 254, 1)',
        'rgba(5, 254, 1, 1)',
        'rgba(255, 82, 0, 1)',
        'rgba(253, 216, 46, 0.8)',
        ' rgba(102, 50, 244, 0.8)',
        'rgba(6, 184, 255, 1)',
        'rgba(4, 191, 177, 1)',
        'rgba(32, 211, 255, 1)'
       
      ],
      borderColor: [
        'rgba(111, 5, 254, 1)',
        'rgba(5, 254, 1, 1)',
        'rgba(255, 82, 0, 1)',
        'rgba(253, 216, 46, 0.8)',
        ' rgba(102, 50, 244, 0.8)',
        'rgba(6, 184, 255, 1)',
        'rgba(4, 191, 177, 1)',
        'rgba(32, 211, 255, 1)'
       
        
      ],
      
      borderWidth: 1,
    },
  ],
  hoverOffset: 10
}} options={{
          responsive:true,
          
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'left',
            },
            title: {
              display: true,
              text: 'Consignments  Activity',
            },
          }
         }}/>}
         </div>
          
          
          
          </div>
          <div className="overflow-x-auto dashboard_table mt-12 px-2 py-3  rounded-md dark:bg-gray-800">
            <div className="dashboard-table-header flex  lg:flex-row flex-col w-full items-start justify-between lg:items-center">
              <h3 className='text-2xl dark:text-gray-300 mb-6 lg:mb-0'>Consignments</h3>
              <div className="dashboard-table-header-right w-full items-center justify-center sm:justify-end flex sm:flex-row flex-col items-center gap-12 sm:mr-8">
                <div className={`relative w-full  ${styles.dashboard_table_header_search} px-8 py-2 dark:bg-gray-800 dark:border-2 dark:border-gray-300 bg-gray-300 text-gray rounded-md`}>
                  <span className='absolute dark:text-gray-300' style={{
                    top: '50%',
                    left:10,
                    transform: 'translateY(-50%)',
                  }}><BiSearch/></span>
                  <input type="text" placeholder='Search' className='border-0 outline-0 bg-transparent' onInput={handleSearch} value={keyword}/>
                </div>
                <div className="relative dark-text-gray-300 dark:bg-gray-800 dashboard-table-filter flex items-center gap-3 cursor-pointer">
                  <select name="status" value={filter} onChange={handleFiltering} className="block appearance-none border-2 border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-50">
                  <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    
                    <option value="Not Approved">Not Approved</option>
                    <option value="Processing">Processing</option>
                    <option value="Returned">Returned</option>
                    <option value="Listed">Listed</option>
                    <option value="Sold">Sold</option>
                    <option value="Points Credited">Points Credited</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
                </div>
              </div>
              
            </div>

<div class="overflow-x-auto relative mt-8">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Consignment Id
                </th>
                <th scope="col" class="py-3 px-6">
                    Consignment Type
                </th>
                <th scope="col" class="py-3 px-6">
                    Schedule by
                </th>
                <th scope="col" class="py-3 px-6">
                    Numbers
                </th>
                <th scope="col" class="py-3 px-6">
                    Status
                </th>
                <th scope="col" class="py-3 px-6">
                    Points
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody style={{
          width:'100%',
          maxHeight:450,
          overflowY:'scroll',
          position:'sticky',
          top:'0'
        }}>
            
            
           

            {
              filteredResult ? filteredResult.map((consignment,i)=>{
                return <ConsignmentRow key={i} consignment={consignment}/>
              }):consignmentDetails && consignmentDetails.allConsignmentsDetails.map((consignment,i)=>{
                return <ConsignmentRow key={i} consignment={consignment}/>
              })
            }
        </tbody>
    </table>
</div>

          </div>
          </Main>
      </div>}
     
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  Consignments:state.appReducer.consignments,
  alert:state.appReducer.alert,
  user_analytics:state.appReducer.user_analytics,
  points_analytics:state.appReducer.points_analytics,
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({
    type: 'SET_USER',
   user
  }),
  setConsignments: (consignments) => dispatch({
    type: 'SET_CONSIGNMENTS',
    consignments
  }),
  setUserAnalytics: (user_analytics) => dispatch({
    type: 'SET_USER_ANAYLITICS',
    user_analytics
  }),
  setPoints:(points_analytics)=>dispatch({
    type:'SET_POINTS_ANALYTICS',
    points_analytics
  })
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);