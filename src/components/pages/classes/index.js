import React,{useEffect} from 'react'
import './style.css'
import Sidebar from '../../ui/sidebar'
import Header from '../../ui/header'
import Footer from '../../ui/footer'
const Classes = ({setLoginUser}) => {
  return (
    <div>
        <Sidebar setLoginUser={setLoginUser}/>
        <Header/>
      <Footer/>
        </div>
  )
}

export default Classes