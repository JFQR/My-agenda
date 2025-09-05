class ManageStorage{
    getItem(item:string):string[] | []{
        let myItem:string | null = localStorage.getItem(item)
        let parsedItem:string[] = myItem ? JSON.parse(myItem) : []
        return parsedItem
    }
    
    getId():number{
        let rawId = localStorage.getItem("id")
        let parsedId = rawId ? JSON.parse(rawId) : 0
        return parsedId
    }
    
    setItem(name:string, content:string[]):void{
        localStorage.setItem(name, JSON.stringify(content));
    }
}
export default ManageStorage