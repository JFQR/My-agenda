import { useEffect, useState } from 'react'

import { Button } from 'primereact/button';

import Form from './Form'

import ManageStorage from '../Tools/ManageStorage';

function EventManager(){
    const manageStorage = new ManageStorage

    const [ myTitles, setTitles ] = useState<string[]>([])
    const [ myDescriptions, setDescriptions ] = useState<string[]>([])
    const [ myDates, setDates ] = useState<string[]>([])
    const [ showForm, setShowForm ] = useState<boolean>(false)

    function offForm(){setShowForm(false)}

    useEffect(()=>{
        //obtains the info from local storage
        const titles: string[] = manageStorage.getItem("titles")
        const descriptions: string[] = manageStorage.getItem("descriptions")
        const dates: string[] = manageStorage.getItem("dates")
        //sets the info of:
        //the titles
        setTitles(prev=>([...prev,...titles]))
        //the descriptions
        setDescriptions(prev=>([...prev,...descriptions]))
        //the dates
        setDates(prev=>([...prev,...dates]))
    },[])

    function handleModify(id){
         //*************************************** */
        localStorage.setItem("id",id)
        setShowForm(true)
    }

    function handleDelete(id){ 
        let parsedTitle:string[] = manageStorage.getItem("titles")
        parsedTitle.splice(id,1,"deleted")
        manageStorage.setItem("titles", parsedTitle)

        let parsedDesc:string[] = manageStorage.getItem("descriptions")
        parsedDesc.splice(id,1,"deleted")
        manageStorage.setItem("descriptions", parsedDesc)

        let parsedDates:string[] = manageStorage.getItem("dates")
        parsedDates.splice(id,1,"deleted")
        manageStorage.setItem("dates", parsedDates)

        window.location.assign('/');
    }

    return(<div className="card">

        {(myDates.length === 0 || myDates.every(date=> date === myDates[0])) ? 
            
            (<p>No events added yet</p>) : 
            
            myDates.map((date, index) => {
                if (date !== "deleted") {
                    return (
                    <div className="event-grouper" key={index}>
                        <p>{date}</p>
                        <p>{myTitles[index]}</p>
                        <Button label="Modify" rounded raised onClick={() => handleModify(index)} />
                        <Button label="Delete" rounded raised onClick={() => handleDelete(index)} severity="danger" />
                    </div>
                    );
                } else {
                    return null
                }
            })}
        
        {showForm && (<Form onClose={offForm} create={false}/>)}
    </div>
    )
}export default EventManager