import { useEffect, useState, useRef } from  'react'

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import DropDown from './DropDown';

import ManageStorage from '../Tools/ManageStorage';

type FormProps = {
    onClose: () => void
    create: boolean
};

function Form({onClose, create}:FormProps){

    const manageStorage = new ManageStorage
    
    const [ newId, setNewId ] = useState<number>(()=>manageStorage.getId())

    const [ enableSubmit, setEnableSubmit ] = useState<boolean>(true)
    const [ newDate, setNewDate ] = useState<{
        year:string,
        month:string,
        day:string
    }>({year:'',month:'',day:''})
    const [ description, setDescription ] = useState<string>()
    const [ title, setTitle ] = useState<string>()


    useEffect(()=>{

        if(newId && create === false){
            setEnableSubmit(false)

            let existingTitles:string[] = manageStorage.getItem("titles")
            setTitle(existingTitles[newId])

            let existingDescs:string[] = manageStorage.getItem("descriptions")
            setDescription(existingDescs[newId])

        }
        
    },[])

    function recieveDate(datePortion){

        if(datePortion.type === "year"){
            setNewDate(prev=>({...prev,year:datePortion.portion}))
        }
        if(datePortion.type === "month"){
            setNewDate(prev=>({...prev,month:datePortion.portion}))
        }
        if(datePortion.type === "day"){
            setNewDate(prev=>({...prev,day:datePortion.portion}))
            setEnableSubmit(false)
        }

    }

    function storeTitleAndDesc(itemToStore:"descriptions" | "titles"){

        let existingItem = manageStorage.getItem(itemToStore)
        //if ther's already content, update it:
        if(!create && title && description){

            existingItem.splice(newId,1,title)
            manageStorage.setItem("titles", existingItem)

            existingItem.splice(newId,1,description)
            manageStorage.setItem("descriptions",existingItem)

        }else{//else, create it 

            if(itemToStore === "titles"){
                if(existingItem && title){
                    const updatedTitle:string[] = [...existingItem, title]
                    manageStorage.setItem("titles",updatedTitle)
                }        
            }else{
                if(existingItem && description){
                    const updatedDesc:string[] = [...existingItem, description]
                    manageStorage.setItem("descriptions",updatedDesc)
                } 
            }  
        }

    }

    async function handleSubmit(){

        await storeTitleAndDesc("titles")
        await storeTitleAndDesc("descriptions")

        const formatedDate = `${newDate.year}-${newDate.month}-${newDate.day}`;
        console.log("formated date: ",create)
        const existingDates = manageStorage.getItem("dates")

        //the date has been modified:
        if(!create && formatedDate !== "--"){
            console.log("update1")
            existingDates.splice(newId,1,formatedDate)
            manageStorage.setItem("dates",existingDates)
        //the form has been modified but not the date:
        }else if(!create && formatedDate === "--"){
            console.log("update2")
            return
        //creating a new date:
        }else{
            console.log("create")
            const updatedDates = [...existingDates, formatedDate];

            manageStorage.setItem("dates",updatedDates);            
        } 
        //window.location.assign("/")
    }

    function handleClose(){
        onClose()
    }

    return(<>

        <form>    
            <FloatLabel>
                {title ? <InputText 
                    required
                    id="Title" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/> 
                
                    : <InputText 
                        required 
                        onChange={(e)=>setTitle(e.target.value)}
                        id="Title" />
                }
                <label htmlFor="Title">Title</label>
            </FloatLabel>

            <DropDown sendDate={recieveDate} create={create}/>
                    

            <FloatLabel>
                {description ? 
                    <InputTextarea 
                        required
                        id="Description" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        rows={5} cols={30} /> 

                    : <InputTextarea 
                        required 
                        id="Description" 
                        onChange={(e)=>setDescription(e.target.value)}
                        rows={5} cols={30} />
                }
                <label htmlFor="Description">Description</label>
            </FloatLabel>
                    
            <div style={{gap:"0.5rem"}}>
                <Button label="Cancel" 
                    onClick={handleClose} 
                    
                    severity="danger" rounded raised
                />

                <Button 
                    type="submit" 
                    id="submit-btn" 
                    disabled={enableSubmit} 
                    onClick={handleSubmit} 
                    label="Submit" 
                    rounded raised
                    />
            </div>

        </form>
    </>)
}export default Form





 
