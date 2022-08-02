import React from 'react'
import getConsignmentsDetails from '../utils/get-consignment-details'

function useConsignmentsDetails() {
    const [consignmentsDetails, setConsignmentsDetails] = React.useState(null)
    React.useEffect(()=>{
        getConsignmentsDetails().then(data=>{
            console.log('Consignments Details=>', data)
            setConsignmentsDetails(data.allConsignments)
        }).catch(err=>{
            console.log('Consignments Details Error=>', err)
        })
    },[])
  return (
    consignmentsDetails
  )
}

export default useConsignmentsDetails