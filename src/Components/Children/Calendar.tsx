import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { useEffect, useState } from 'react';

import ManageStorage from '../Tools/ManageStorage';

function Calendar() {

    const storage = new ManageStorage

    const [ myEvents, setMyEvents ] = useState<string[]>([])

    useEffect(()=>{

        let parsedDates:string[] = storage.getItem("dates")

        setMyEvents(prev=>([...prev,...parsedDates]))

    },[]);

    let dateValue: Date = new Date();

    function disabledDate(args): void {
        const dateStr = args.date.toISOString().split("T")[0];
        if (myEvents.includes(dateStr)) {
            args.element.classList.add("e-custom-purple");
        }

    }
    return (<>
        {myEvents.length > 0 ? (
            <div className='card'>
                <CalendarComponent 
                    id="calendar" 
                    renderDayCell={disabledDate} 
                    value={dateValue} 
                />
            </div>
        ):(<></>)}

    </>)
}export default Calendar