import { useEffect, useState, useRef } from  'react'

import Calendar from './Children/Calendar';
import EventManager from './Children/EventManager';
import Form from './Children/Form'


function ParentComponent(){
    
    const [ showForm, setShowForm ] = useState<boolean>(false)

    function offForm(){setShowForm(false)}

    return(<div style={{textAlign:"center"}}>
        <h1 style={{marginTop:"4rem"}}>My agenda</h1>
        <main>
            
            <button className="card button-text" onClick={()=>setShowForm(true)}>Add new event</button>
            
            {showForm && (<Form onClose={offForm} create={true}/>)}
            <EventManager />
            <Calendar/>
        </main>
    </div>)
}export default ParentComponent