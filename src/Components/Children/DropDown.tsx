import { useState, useRef, useEffect } from 'react'

type Dates = {
    years:string[],
    months:string[],
    days:string[]
}
export type DateStructure = {
    portion:string,
    type:string
}
type DropDownType = {
    sendDate:(date:DateStructure)=>void
}


function DropDown({sendDate}:DropDownType){

    useEffect(()=>{
        //*************************************** */
        const id = localStorage.getItem("id")
        if(id){
             //*************************************** */
            const parsedId:number = parseInt(id)
            setExistingId(parsedId)
             //*********************************************** */
            const storedDates = localStorage.getItem("dates")
            let existingDates: string[] = storedDates ? JSON.parse(storedDates) : [];
            if(existingDates){
                let myDate = existingDates[parsedId]
                console.log("date in fropdown: ",myDate)
                let datePieces:string[] = myDate.split("-")
                setYear(datePieces[0])
                setMonth(datePieces[1])
                setDay(datePieces[2])
            }
        }
    },[])

    const [ year, setYear ] = useState<string>()
    const [ month, setMonth ] = useState<string>()
    const [ day, setDay ] = useState<string>()
    const [ existingId, setExistingId ] = useState<number>()
    const monthSelect = useRef<HTMLSelectElement>(null)
    const daySelect = useRef<HTMLSelectElement>(null)

    let dates:Dates = {years:["2025","2026","2027","2028","2029","2030"],
                months:["01","02","03","04","05","06","07","08","09",
                    "10","11","12"],
                days:["01","02","03","04","05","06","07","08","09","10","11",
                    "12","13","14","15","16","17","18","19","20","21","22",
                    "23","24","25","26","27","28","29","30","31",
                ]}

    function manageDate(portion:string,type:string):void{
        if(monthSelect.current && type === "year"){
            monthSelect.current.disabled = false
        }
        if(daySelect.current && type === "month"){
            daySelect.current.disabled = false
        }
        sendDate({portion,type})  
    }
    
    return(<div className="dropdowns-container">
        <select>
            {year ? 
                (<option>{year}</option>)
                :(<option>Year</option>)
            }
            {dates.years.map(year =>(<option onClick={()=>manageDate(year,"year")}>{year}</option>))}

        </select>

        <select ref={monthSelect} disabled={true}>
            {month ? 
                (<option>{month}</option>)
                :(<option>Month</option>)
            }
            {dates.months.map(month =>(<option  onClick={()=>manageDate(month,"month")}>{month}</option>))}
        </select>
        <select ref={daySelect} disabled={true}>
            {day ? 
                (<option>{day}</option>)
                :(<option>Day</option>)
            }
            {dates.days.map(day =>(<option onClick={()=>{manageDate(day,"day")}}>{day}</option>))}
        </select>
    </div>)
}export default DropDown