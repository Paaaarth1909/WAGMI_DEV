let quiz = [
    {
        q: "What does HTML primarily define?",
        a: ["Logic", "Structure", "Styling", "Database"],
        c: 1
    },
    {
        q: "Which CSS layout is best for two-dimensional layouts?",
        a: ["Flexbox", "Float", "Grid", "Inline"],
        c: 2
    },
    {
        q: "Which keyword prevents variable reassignment?",
        a: ["var", "let", "static", "const"],
        c: 3
    },
    {
        q: "What does event bubbling mean?",
        a: [
            "Child events go to parent",
            "Parent events go to child",
            "Events stop automatically",
            "JS crashes"
        ],
        c: 0
    },
    {
        q: "Which method converts JSON string to object?",
        a: ["JSON.stringify()", "JSON.parse()", "toObject()", "parseInt()"],
        c: 1
    },
    {
        q: "Which is NOT a valid HTTP method?",
        a: ["GET", "POST", "FETCH", "DELETE"],
        c: 2
    }
]

let i = 0
let score = 0
let time = 15
let timerId

let qEl = document.getElementById("question")
let opts = document.querySelectorAll(".opt")
let tEl = document.getElementById("timer")
let fill = document.getElementById("fill")
let qc = document.getElementById("qcount")
let res = document.getElementById("result")

load()

function load(){
    clearInterval(timerId)
    time = 15
    updateTimer()

    let cur = quiz[i]
    qEl.textContent = cur.q
    qc.textContent = `${i+1} / ${quiz.length}`
    fill.style.width = (i / quiz.length) * 100 + "%"
    res.textContent = ""

    opts.forEach((b,idx)=>{
        b.className = "opt"
        b.textContent = cur.a[idx]
        b.onclick = ()=> choose(idx)
    })

    timerId = setInterval(()=>{
        time--
        updateTimer()
        if(time === 0){
            clearInterval(timerId)
            autoNext()
        }
    },1000)
}

function updateTimer(){
    tEl.textContent = `⏱ ${time}s`
}

function choose(idx){
    clearInterval(timerId)
    let ans = quiz[i].c

    opts.forEach(b => b.onclick = null)

    if(idx === ans){
        opts[idx].classList.add("correct")
        score++
    } else {
        opts[idx].classList.add("wrong")
        opts[ans].classList.add("correct")
    }

    setTimeout(next, 900)
}

function autoNext(){
    opts[quiz[i].c].classList.add("correct")
    setTimeout(next, 900)
}

function next(){
    i++
    if(i < quiz.length){
        load()
    } else {
        end()
    }
}

function end(){
    qEl.textContent = "Quiz Completed"
    res.textContent = `Your Score: ${score} / ${quiz.length}`
    opts.forEach(b => b.style.display = "none")
    fill.style.width = "100%"
    tEl.textContent = ""
}
