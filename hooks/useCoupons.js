import React from 'react'
import getCoupons from '../utils/get-coupons';

function useCoupons() {
    const [coupons,setCoupons] = React.useState(null);
    React.useEffect(()=>{
        getCoupons().then((data)=>{
            console.log("Coupon Data",data);
            setCoupons(data.coupons);
        }).catch((e)=>{
            console.log("Coupon Error",e);
        })
    },[])
  return (
    coupons
  )
}

export default useCoupons