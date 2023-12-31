import React,{useEffect,useRef,useContext} from "react"
import logo from "../../assets/images/logo.png"
import { NavLink,Link } from "react-router-dom"
import userimg from "../../assets/images/avatar-icon.png"
import {BiMenu} from "react-icons/bi"
import { authContext } from "../../context/AuthContext.js"

const navLinks =  [
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctors',
    display:'Doctors'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path:'/contact',
    display:'Contact'
  }
]

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);


  const {user,role,token} = useContext(authContext)
  const handleStickyHeader = () => {
    window.addEventListener('scroll',()=>{
      if (window.scrollY > 80 || document.documentElement.scrollTop>80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }

    })
   
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
  
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleStickyHeader);
    };
  }, []);


    const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

 
    return (
    <header className="header flex items-center" ref={headerRef}>
     <div className="container">
      <div className="flex item-center justify-between">

        
      <div  className="flex items-center gap-4">
          <img src={logo} alt="logo"/>
        </div>
        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
        
          <ul className="menu flex items-center gap-[2.7rem]">
            {
              navLinks.map((link,index)=><li key={index}>
              <NavLink to={link.path} className={navClass => navClass.isActive? 'text-primaryColor text-[16px] leading-7 font-[600]':'text-textColor text-[16px] leading-7 font-[500]'}>{link.display}</NavLink>
              </li>)
            }
           
          </ul>
          </div>
        <div className="flex items-center gap-4">
         

          {
            token && user?( <div>
              <Link to={`${role==='doctor'?'/doctor/profile/me':'/users/profiles/me'}`}>
        
            <img src={user?.photo} className="w-full rounded-full divide-amber-900" alt={user?.name}/>
             
          

           <h2>{user?.name}</h2>
          </Link>
            </div>):(  <Link to='/login'>
           <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
            Login
           </button>
           
            </Link> )
          }
          
          
                   
          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer'/>
          </span>
         
        </div>
        
      </div>

     </div>
    </header>)
}
export default Header