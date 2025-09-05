import { useEffect, useState } from 'react'

import { Button } from 'primereact/button';

import Form from './Form'

function EventManager(){
    const [ myTitles, setTitles ] = useState<string[]>([])
    const [ myDescriptions, setDescriptions ] = useState<string[]>([])
    const [ myDates, setDates ] = useState<string[]>([])
    const [ showForm, setShowForm ] = useState<boolean>(false)

    function offForm(){setShowForm(false)}

    useEffect(()=>{
        //obtains the info from local storage
        const titles: string | null = localStorage.getItem("titles")
        const descriptions: string | null = localStorage.getItem("descriptions")
        const dates: string | null = localStorage.getItem("dates")
        //sets the info of:
        //the titles
        let existingTitles: string[] = titles ? JSON.parse(titles) : [];
        setTitles(prev=>([...prev,...existingTitles]))
        //the descriptions
        let existingDescriptions: string[] = descriptions ? JSON.parse(descriptions) : [];
        setDescriptions(prev=>([...prev,...existingDescriptions]))
        //the dates
        let existingDates: string[] = dates ? JSON.parse(dates) : [];
        setDates(prev=>([...prev,...existingDates]))
    },[])

    function handleModify(id){
         //*************************************** */
        localStorage.setItem("id",id)
        setShowForm(true)
    }

    function handleDelete(id){
         //*************************************** */
        let currentTitle:string | null= localStorage.getItem("titles")
        let parsedTitle:string[] = currentTitle ? JSON.parse(currentTitle) : []
        parsedTitle.splice(id,1)
         //*************************************** */
        localStorage.setItem("titles",JSON.stringify(parsedTitle))
 //*************************************** */
        let currentDesc:string | null= localStorage.getItem("descriptions")
        let parsedDesc:string[] | null = currentDesc ? JSON.parse(currentDesc) : []
        parsedDesc?.splice(id,1)
         //*************************************** */
        localStorage.setItem("descriptions",JSON.stringify(parsedDesc))
 //*************************************** */
        let currentDates:string | null= localStorage.getItem("dates")
        let parsedDates:string[] = currentDates ? JSON.parse(currentDates) : []
        parsedDates?.splice(id,1)
         //*************************************** */
        localStorage.setItem("dates",JSON.stringify(parsedDates))

        window.location.assign('/');
    }

    return(<div className="card">

        {myDates.length === 0 ? (<p>No events added yet</p>): myDates.map((date,index)=>{return(
            <div className="event-grouper">
                <p>{date}</p>
                <p>{myTitles[index]}</p>
                <Button label="Modify" rounded raised onClick={()=>handleModify(index)}/>
                <Button label="Delete" rounded raised onClick={()=>handleDelete(index)}severity="danger"/>
            </div>
        )})}
        
        {showForm && (<Form onClose={offForm}/>)}
    </div>
    )
}export default EventManager