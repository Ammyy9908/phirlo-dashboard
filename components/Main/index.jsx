import React from 'react'
import styles from "./index.module.css"
function Main({children}) {
  return (
    <div className={`${styles.main} px-5 md:px-12`}>{children}</div>
  )
}

export default Main