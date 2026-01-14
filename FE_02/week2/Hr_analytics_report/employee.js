const fs = require("fs");

// Read employees.json file
fs.readFile("employees.json", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  const employees = JSON.parse(data);

  // 1️⃣ Sort employees by salary (descending)
  const sortedEmployees = [...employees].sort(
    (a, b) => b.salary - a.salary
  );

  // 2️⃣ Filter employees with >= 3 years experience
  const experiencedEmployees = employees.filter(
    emp => emp.experience >= 3
  );

  // 3️⃣ Create summary list with bonus
  const summaryList = experiencedEmployees.map(emp => ({
    name: emp.name,
    department: emp.department,
    bonus: emp.salary * 0.10 * emp.experience
  }));

  // 4️⃣ Total salary expenditure
  const totalSalary = experiencedEmployees.reduce(
    (sum, emp) => sum + emp.salary,
    0
  );

  // 🔹 Display Output
  console.log("\n🔹 Sorted Employees (High → Low Salary):");
  console.table(sortedEmployees);

  console.log("\n🔹 Summary List (Experienced Employees):");
  console.table(summaryList);

  console.log("\n🔹 Total Salary Expenditure:");
  console.log(`₹${totalSalary}`);
});
