import React,{useEffect} from 'react'
import './style.css'
import Sidebar from '../../ui/sidebar'
import Header from '../../ui/header'
import Footer from '../../ui/footer'
const Home = (props) => {
  // const getUser = localStorage.getItem("userData")
  // const user = JSON.parse(getUser);
  // console.log('chekcpp',props)
  return (
    <div>
      <Sidebar userRole={props.setLoginUser.role}/>
      <Header/>
      <Footer/>
        </div>
  )
}

export default Home