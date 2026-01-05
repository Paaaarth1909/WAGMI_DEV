let questions = [
    {
        q: "What does HTML mainly define?",
        o: ["Logic","Structure","Styling","Database"],
        a: 1
    },
    {
        q: "Best layout for 2D design?",
        o: ["Flexbox","Float","Grid","Inline"],
        a: 2
    },
    {
        q: "Which keyword blocks reassignment?",
        o: ["var","let","static","const"],
        a: 3
    },
    {
        q: "Event bubbling means?",
        o: [
            "Child to parent",
            "Parent to child",
            "Stops automatically",
            "JS crash"
        ],
        a: 0
    },
    {
        q: "JSON.parse() does what?",
        o: [
            "Object to string",
            "String to object",
            "Clone data",
            "Encrypt"
        ],
        a: 1
    },
    {
        q: "Which is NOT an HTTP method?",
        o: ["GET","POST","FETCH","DELETE"],
        a: 2
    }
]

let currentIndex = 0
let remainingTime = 15
let totalScore = 0
let timerRef

let qText = document.getElementById("questionText")
let options = document.querySelectorAll(".choice")
let timerLabel = document.getElementById("timeLeft")
let progressLabel = document.getElementById("progress")
let bar = document.getElementById("loaderFill")
let feedback = document.getElementById("feedback")
let card = document.querySelector(".quiz-card")

render()

function render(){
    clearInterval(timerRef)
    remainingTime = 15
    updateTimer()

    let item = questions[currentIndex]
    qText.textContent = item.q
    progressLabel.textContent = `${currentIndex+1} / ${questions.length}`
    bar.style.width = (currentIndex / questions.length) * 100 + "%"
    feedback.textContent = ""

    options.forEach((btn,i)=>{
        btn.className = "choice"
        btn.style.display = "block"
        btn.textContent = item.o[i]
        btn.onclick = ()=> handleAnswer(i)
    })

    timerRef = setInterval(()=>{
        remainingTime--
        updateTimer()

        if(remainingTime === 3){
            timerLabel.classList.add("danger")
        }

        if(remainingTime === 0){
            clearInterval(timerRef)
            skipQuestion()
        }
    },1000)
}

function updateTimer(){
    timerLabel.textContent = `⏱ ${remainingTime}s`
}

function handleAnswer(index){
    clearInterval(timerRef)
    timerLabel.classList.remove("danger")

    let correctIndex = questions[currentIndex].a
    options.forEach(b => b.onclick = null)

    if(index === correctIndex){
        options[index].classList.add("correct")
        totalScore++
        feedback.textContent = "Correct"
    } else {
        options[index].classList.add("wrong")
        options[correctIndex].classList.add("correct")
        feedback.textContent = "Wrong"
    }

    setTimeout(nextStep, 900)
}

function skipQuestion(){
    card.classList.add("timeout")
    timerLabel.classList.remove("danger")
    feedback.textContent = "Time up"

    setTimeout(()=>{
        card.classList.remove("timeout")
        nextStep()
    },500)
}

function nextStep(){
    currentIndex++
    if(currentIndex < questions.length){
        render()
    } else {
        finish()
    }
}

function finish(){
    qText.textContent = "Quiz Completed"
    feedback.textContent = `Score: ${totalScore} / ${questions.length}`
    options.forEach(b => b.style.display = "none")
    bar.style.width = "100%"
    timerLabel.textContent = ""
}
