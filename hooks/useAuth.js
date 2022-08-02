import Cookies from 'js-cookies';
import React from 'react'

function useAuth() {
    const [user, setUser] = React.useState(false)

    React.useEffect(() => {
        if(Cookies.getItem('token')){
            setUser(true)
        }

    }, [])
  return (
    user
  )
}

export default useAuth