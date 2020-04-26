 import React ,{useContext,useEffect} from 'react'
 import AuthContext from '../../context/authContext/authContext'
 import GuestFom from '../guests/GuestForm'
 import GuestCounter from '../guests/GuestCounter'
 import GuestFilter from '../guests/GuestFilter'
 import GuestSearch from '../guests/GuestSearch'
 import Guests from '../guests/Guests'
 const Home = () => {
     const{getUser}=useContext(AuthContext)
     useEffect(() => {
        getUser()
        // eslint-disable-next-line
      }, [])
     return (
         <div className='app-container'>
             <div className='main'>
                <div className='filter'>
                    <GuestFilter />
                    <GuestSearch />
                </div>
                <GuestFom />
                <GuestCounter />
             </div>
             <Guests />
         </div>
     )
 }
 
 export default Home
 