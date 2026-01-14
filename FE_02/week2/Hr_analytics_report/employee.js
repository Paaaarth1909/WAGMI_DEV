const fs = require("fs")

fs.readFile("employees.json", "utf-8", (err, raw) => {
  if (err) {
    console.log("file error", err)
    return
  }

  let employees = JSON.parse(raw)

  let sorted = [...employees].sort((x, y) => y.salary - x.salary)

  let experienced = employees.filter(e => e.experience >= 3)

  let summary = experienced.map(e => {
    return {
      name: e.name,
      department: e.department,
      bonus: e.salary * 0.1 * e.experience
    }
  })

  let total = experienced.reduce((s, e) => s + e.salary, 0)

  console.log("\nSorted Employees")
  console.table(sorted)

  console.log("\nExperienced Employees Summary")
  console.table(summary)

  console.log("\nTotal Salary Expenditure")
  console.log("₹" + total)
})
