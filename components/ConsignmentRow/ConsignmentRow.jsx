import React from 'react'
import { connect } from 'react-redux';
import getConsignments from '../../utils/get-consignments';
import updateConsignment from '../../utils/update-consignment'
import {MdOutlineDelete} from 'react-icons/md'
import {AiFillSave} from 'react-icons/ai'
function ConsignmentStatusInput({setStatus,status,setChanges}){


   React.useEffect(()=>{
    switch(status){
        case 'PENDING':
            setStatus('Pending')
            break;
        case 'APPROVED':
            setStatus('Approved')
            break;
        case 'NOT_APPROVED':
            setStatus('Not Approved')
            break;
        case 'POINTS_CREDITED':
            setStatus('Points Credited')
            break;
        case 'PROCESSING':
            setStatus('Processing')
            break;
        case 'LISTED':
            setStatus('Listed')
            break;
        case 'SOLD':
            setStatus('Sold')
            break;
        case 'CANCELLED':
            setStatus('Cancelled')
            break;
        case 'RETURNED':
            setStatus('Returned')
            break;
        
    } 
   },[status])
    return (
      <div className='relative'>
      <select className={`block appearance-none ${status==="Not Approved" && "bg-teal-500"}  ${status==="Processing" && "bg-indigo-500"} ${status==="Pending" && "bg-gray-200"} ${status==="Approved" && "bg-green-200"} ${status==="Points Credited" && "bg-yellow-500"} ${status==="Cancelled" && "bg-red-200"} ${status==="Returned" && "bg-blue-200"} border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-50`} onChange={(e)=>{
        setStatus(e.target.value)
        setChanges(true)
      }}
        value={status}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
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
    )
  }   
function ConsignmentRow({consignment,setConsignments,setAlert}) {
    const [points,setPoints] = React.useState(0)
    const [status,setStatus] = React.useState(null)
    const [changes,setChanges] = React.useState(false)

    console.log("Consignment status",status)
    console.log("Row Consignment",consignment)

    React.useEffect(()=>{
        setStatus(consignment.deliveryStatus)
        setPoints(consignment.points)
    },[consignment])


    // handle the consignment update 

    const handleConsignmentUpdate = () => {
        updateConsignment(consignment.consignmentId,status,points).then((data)=>{
            console.log("Consignment updated",data)
            alert("Consignment updated")
            // setAlert({
            //     title:"Consignment Updated",
            //     subheading:`Consignment has been updated successfully`,
            // })
            const {success} = data.updateConsignmentStatus;
            if(success){
                
                setChanges(false)
                getConsignments().then((data)=>{
                    console.log("Consignment Data",data);
                    setConsignments([data.allConsignments.totalProcessing,data.allConsignments.totalTimesPointsCredited,data.allConsignments.totalApproved,data.allConsignments.totalRejected,data.allConsignments.totalCancelled,data.allConsignments.totalCancelled,data.allConsignments.totalListed,data.allConsignments.totalPending,data.allConsignments.totalSold]);
                }).catch((e)=>{
                    console.log("Consignment Error",e);
                })
            }
        }).catch((err)=>{
            console.log("Error updating consignment",err)
        })
    }
  return (
    <tr className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white hover:ring-8 hover:ring-purple-400">
                <th scope="row" class="text-xs py-4 px-6 font-medium whitespace-nowrap">
                  {consignment.consignmentId}
                </th>
                <td className="py-4 px-6 text-xs">
                    {consignment.consignmentName}
                </td>
                <td className="py-4 px-6 text-xs">
                {consignment.name}
                </td>
                <td className="py-4 px-6 text-xs">
                    {consignment.noOfItems}
                </td>
                <td className="py-4 px-6 text-xs">
                    <ConsignmentStatusInput setStatus={setStatus} status={status} setChanges={setChanges}/>
                </td>
                <td className='py-4 px-6 text-xs'>
                  <input type="number" name="points" placeholder='Points' className='px-3 py-3 bg-gray-300 text-black' value={points} onChange={(e)=>{
                    setPoints(e.target.value)
                    setChanges(true)
                  }}
                  readOnly={ status!=="Points Credited" && true}
                  />
                </td>
                <td className="py-4 px-6 text-xs flex gap-2 items-center">
                    <button className={`px-3 py-3 rounded-full ${!changes?"bg-gray-300 cursor-not-allowed":"bg-purple-700"} text-white`} onClick={handleConsignmentUpdate} disabled={!changes}><AiFillSave/></button>
                    <button className={`px-3 py-3 rounded-full bg-red-600 text-white`} onClick={handleConsignmentUpdate} disabled={!changes}><MdOutlineDelete/></button>
                </td>
            </tr>
  )
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({
      type: 'SET_USER',
     user
    }),
    setConsignments: (consignments) => dispatch({
        type: 'SET_CONSIGNMENTS',
        consignments
      }),
      setAlert: (alert) => dispatch({
        type: 'SET_ALERT',
       alert
      }),
  })

export default connect(null,mapDispatchToProps)(ConsignmentRow)