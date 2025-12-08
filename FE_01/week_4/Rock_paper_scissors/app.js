let user = document.getElementById("user")
let comp = document.getElementById("comp")
let res = document.getElementById("res")

let btns = document.querySelectorAll(".btn")

btns.forEach(b => {
    b.onclick = () => {
        let u = b.dataset.move
        let c = pick()
        let r = check(u, c)

        user.textContent = "you: " + u
        comp.textContent = "computer: " + c
        res.textContent = r
    }
})

function pick(){
    let arr = ["rock", "paper", "scissors"]
    return arr[Math.floor(Math.random() * 3)]
}

function check(u,c){
    if(u===c) return "tie"
    if(u==="rock" && c==="scissors") return "you win"
    if(u==="paper" && c==="rock") return "you win"
    if(u==="scissors" && c==="paper") return "you win"
    return "you lose"
}
