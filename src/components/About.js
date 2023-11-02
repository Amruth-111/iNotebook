import React from 'react'
import { useContext ,useEffect} from 'react'
import noteContext from '../context/Notes/noteContext'

export default function About() {
    let a=useContext(noteContext)
    useEffect(()=>{
        a.update();
        // eslint-disable-next-line
    },[])

  return (
    <div>
      hello this is About {a.state.name} and his age is {a.state.age}
    </div>
  )
}

