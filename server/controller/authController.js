const employee = require("../modal/EmployeeModal");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emp = await employee.findOne({ email });

    if (!emp || !(await emp.passwordCompare(password, emp.password))) {
      res.status(400).json({ error: "Wrong email or password" });
    } else {
      emp.password = null
      res.status(200).send(emp);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
