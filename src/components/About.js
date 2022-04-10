import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'


function About() {
  const a = useContext(noteContext)

  useEffect(()=>{
    a.update() 
    return () =>{
      
    }
  }, [])
  return (
    <div>
      
      this is about {a.state.name} and class {a.state.class}
    </div>
  )
}

export default About;
