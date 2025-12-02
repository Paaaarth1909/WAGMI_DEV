let input = document.getElementById("taskInput")
let btn = document.getElementById("addBtn")
let list = document.getElementById("list")

let data = JSON.parse(localStorage.getItem("tasks")) || []

render()

btn.onclick = () => {
    let v = input.value.trim()
    if(v !== ""){
        data.push(v)
        input.value = ""
        save()
        render()
    }
}

function removeTask(i){
    data.splice(i,1)
    save()
    render()
}

function render(){
    list.innerHTML = ""
    for(let i=0;i<data.length;i++){
        let li = document.createElement("li")
        let t = document.createElement("span")
        t.textContent = data[i]

        let del = document.createElement("button")
        del.textContent = "x"
        del.onclick = () => removeTask(i)

        li.appendChild(t)
        li.appendChild(del)
        list.appendChild(li)
    }
}

function save(){
    localStorage.setItem("tasks", JSON.stringify(data))
}
