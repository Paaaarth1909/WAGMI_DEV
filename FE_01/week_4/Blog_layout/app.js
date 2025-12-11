let btn = document.getElementById("mode")

btn.onclick = () => {
    document.body.classList.toggle("dark")
    btn.textContent = btn.textContent==="dark" ? "light" : "dark"
}
