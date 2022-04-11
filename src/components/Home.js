import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import Notes from './Notes'



function Home() {
 
  return (
    <div>
      
      {/* Notes component added */}
      <Notes />
    </div>
  )
}

export default Home
