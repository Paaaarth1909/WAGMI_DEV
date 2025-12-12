let img = document.getElementById("pic")
let prev = document.getElementById("prev")
let next = document.getElementById("next")

let arr = ["img1.jpg","img2.jpg","img3.jpg"]
let i = 0

next.onclick = () => {
    i++
    if(i>=arr.length) i=0
    img.src = arr[i]
}

prev.onclick = () => {
    i--
    if(i<0) i=arr.length-1
    img.src = arr[i]
}
