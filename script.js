let inptext = document.getElementById('inptext');
const addBtn = document.getElementById('add');
let tasks = document.getElementById('tasks');
let tasklist = localStorage.getItem('data')?JSON.parse((localStorage).getItem('data')):[];

tasklist.forEach((task)=>{
task = task[0].toUpperCase()+task.slice(1);
let li = document.createElement("li");
li.classList.add("newnote");
li.innerHTML=`<h4 id="note">${task}</h4>
<button class="editbtn" onclick="editNote(this)">&#9998;</button>
<button class="deletebtn" onclick="deleteNote(this)">&#128465;</button>`;
let cb = document.createElement("input");
cb.setAttribute("type","checkbox");
tasks.appendChild(cb);
tasks.appendChild(li);
});
addBtn.addEventListener('click',() => {
    let newNote = inptext.value;
    if(newNote === ''){
        alert("Please enter a note to add !");
    }
    else{
        inptext.value = '';
        newNote = newNote[0].toUpperCase()+newNote.slice(1);
        tasklist.push(newNote);
        localStorage.setItem('data',JSON.stringify(tasklist));
        let li = document.createElement("li");
        li.classList.add("newnote");
        li.innerHTML=`<h4 id="note">${newNote}</h4>
        <button class=editbtn onclick="editNote(this)">&#9998;</button>
        <button class=deletebtn onclick="deleteNote(this)">&#128465;</button>`;
        let cb = document.createElement("input");
        cb.setAttribute("type","checkbox");
        tasks.appendChild(cb);
        tasks.appendChild(li);
    }
    console.log(JSON.parse(localStorage.getItem('data')));
});

let deleteNote = (thisEle)=>{
    const index = tasklist.indexOf(thisEle.parentElement.children[0].textContent)
    tasklist.splice(index,1);
    localStorage.setItem('data',JSON.stringify(tasklist));
    thisEle.parentElement.previousElementSibling.remove();
    thisEle.parentElement.remove()
}
let indexArray = [];
let editNote = (thisEle)=>{
    const index = tasklist.indexOf(thisEle.parentElement.children[0].textContent)
    console.log(thisEle.parentElement.children[0])
    indexArray.push(index);
    console.log(tasklist[index]);
    console.log(index)
    if(thisEle.textContent === "✔"){
        thisEle.textContent = "✎";
        let newNote = thisEle.previousElementSibling.value;
        let currentValue = document.createElement("h4");
        currentValue.id = "note";
        currentValue.textContent = newNote;
        thisEle.parentElement.replaceChild(currentValue,thisEle.previousElementSibling);
        tasklist[indexArray[0]] = newNote;
        console.log(tasklist);
        localStorage.setItem('data',JSON.stringify(tasklist));
        indexArray = [];
    }
    else{
        thisEle.textContent = "✔";
        let task = thisEle.previousElementSibling.textContent;
        let editableInput = document.createElement("input");
        editableInput.classList.add("inptext");
        editableInput.setAttribute("type","text");
        editableInput.value = task;
        editableInput.style.border = "1px solid black";
        var x = window.matchMedia("(max-width: 480px)");
        if(x.matches)
        {
            editableInput.style.width="80%";
        }
        thisEle.parentElement.replaceChild(editableInput,thisEle.previousElementSibling);
    }
}
