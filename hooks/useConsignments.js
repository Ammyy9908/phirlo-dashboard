import React from 'react'
import getConsignments from '../utils/get-consignments';

function useConsignments() {
    const [consignments, setConsignments] = React.useState(null)
    React.useEffect(() => {

        getConsignments().then((consignments)=>{
            console.log("Consignments Data",consignments);
            setConsignments([consignments.allConsignments.totalPending,consignments.allConsignments.totalApproved,consignments.allConsignments.totalListed,consignments.allConsignments.totalReturned,consignments.allConsignments.totalProcessing,consignments.allConsignments.totalCancelled,consignments.allConsignments.totalRejected,consignments.allConsignments.totalSold,consignments.allConsignments.totalTimesPointsCredited,]);

        }).catch((e)=>{
            console.log("Consignments Error",e);
        })
    }, [])
  return (
    consignments
  )
}

export default useConsignments