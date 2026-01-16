const fs = require("fs")

const raw = fs.readFileSync("fe02_bank.csv", "utf-8")

const rows = raw.trim().split("\n")
const cols = rows[0].split(",")

const transactions = rows.slice(1).map(r => {
  const vals = r.split(",")
  let obj = {}

  cols.forEach((c, i) => {
    obj[c] = vals[i]
  })

  obj.Amount = Number(obj.Amount)
  obj.Date = new Date(obj.Date)

  return obj
})

transactions.sort((a, b) => a.Date - b.Date)

let summary = {}

transactions.forEach(t => {
  let name = t.AccountHolder

  if (!summary[name]) {
    summary[name] = {
      AccountHolder: name,
      TotalCredit: 0,
      TotalDebit: 0,
      LargestTransaction: 0,
      SalaryTransactions: []
    }
  }

  if (t.Type.toLowerCase() === "credit") {
    summary[name].TotalCredit += t.Amount
  } else if (t.Type.toLowerCase() === "debit") {
    summary[name].TotalDebit += t.Amount
  }

  let amt = Math.abs(t.Amount)
  if (amt > summary[name].LargestTransaction) {
    summary[name].LargestTransaction = amt
  }

  if (t.Remarks.toLowerCase().includes("salary")) {
    summary[name].SalaryTransactions.push(t.TransactionID)
  }
})

const result = Object.values(summary)

console.log("\nBank Summary")
console.table(result)

const outCols = [
  "AccountHolder",
  "TotalCredit",
  "TotalDebit",
  "LargestTransaction",
  "SalaryTransactions"
]

let out = outCols.join(",") + "\n"

result.forEach(r => {
  out += [
    r.AccountHolder,
    r.TotalCredit,
    r.TotalDebit,
    r.LargestTransaction,
    `"${r.SalaryTransactions.join("|")}"`
  ].join(",") + "\n"
})

fs.writeFileSync("bank_summary.csv", out)

console.log("\nCSV generated")
