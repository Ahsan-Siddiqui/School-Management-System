import React,{useEffect} from 'react'
import './style.css'
import Sidebar from '../../ui/sidebar'
import Header from '../../ui/header'
import Footer from '../../ui/footer'
const Teachers = (props) => {
  return (
    <div>
      <Sidebar userRole={props.setLoginUser.role}/>
      <Header/>
      <Footer/>
    </div>
  )
}

export default Teachers