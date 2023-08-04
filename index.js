import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase ,ref, push,onValue,remove}from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const mydatabase={
    databaseURL:"https://mobile-app-78608-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app=initializeApp(mydatabase)
const database=getDatabase(app)
const Todolist=ref(database,"todolist")
const input=document.getElementById("input-el")
const  button=document.getElementById("btn")
const todolistdisplay=document.getElementById("ul-el")
onValue(Todolist,function(snapshot){
    if(snapshot.exists()){
    let array=Object.entries(snapshot.val())
    todolistdisplay.innerHTML=" "
    
    for(let i=0;i<array.length;i++){
        let element=array[i]
        let elementId=element[0]
        let elementValue=element[1]
        let liel=document.createElement("li")
        liel.textContent=elementValue
        
        liel.addEventListener("click",function(){
        let removeelement   = ref(database, `todolist/${elementId}`)
            remove(removeelement)
        })
        todolistdisplay.append(liel)
        }
    }
    else{
        todolistdisplay.innerHTML="No todolist here..."
    }



})
button.addEventListener("click",function(){
    let inputvalue=input.value
    
    push(Todolist,inputvalue)
    input.value=" "
    })
