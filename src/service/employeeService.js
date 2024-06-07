import { Employee } from "../model/employee.js";
import { Op } from "sequelize";

const getEmployees = async (req, res) => {
  let { name } = req.query;

  if (!name) name = "";

  const employees = await Employee.findAll({
    where: {
      name: {
        [Op.iLike]: `${name}%`,
      },
    },
  });

  res.json(employees);
};

export { getEmployees };
