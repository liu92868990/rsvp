import React ,{useContext} from 'react'
import GuestContext from '../../context/guestContext/guestContext'
import Guest from './Guest'

const Guests = () => {
    const {guests}=useContext(GuestContext)
    return (
        <div className="guests">
        {guests.map(guest=><Guest key={guest.id} guest={guest}/>)}
      </div>
    )
}

export default Guests
