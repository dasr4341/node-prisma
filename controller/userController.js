import prisma from "../DB/db.config.js";

export const fetchAllUsers = async (req, res) => {
  const users = await prisma.employee.findMany({
    include: {
      department: true,
    }
  });
  return res.json({ status: 200, data: users });
};

export const createEmp = async (req, res) => {
  const { name, email, department_id, salary } = req.body;

  const findUser = await prisma.employee.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email Already Taken . please another email.",
    });
  }

  const newUser = await prisma.employee.create({
    data: {
      name: name,
      email: email,
      department_id,
      salary
    },
  });

  return res.json({ status: 200, data: newUser, msg: "User created." });
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.employee.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  await prisma.employee.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      salary
    },
  });

  return res.json({ status: 200, message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.employee.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, msg: "User deleted successfully" });
};


export const getEmployeesByFilter = async (req, res) => {
  const users = await getEmployeesByFilterHelper({...req.body})
  return res.json({ status: 200, data: users });
};

export const getEmployeesByFilterHelper = async ({
  department = '',
  minSalary = 0,
  maxSalary = 0,
  startDate,
  endDate,
  sortBy = 'created_at',
  order = 'asc',
}) => {
  const employees = await prisma.employee.findMany({
    where: {
      department: department ? { is: { name: department } } : undefined,
      salary: {
        gte: minSalary || undefined,
        lte: maxSalary || undefined,
      },
      created_at: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
    orderBy: {
      [sortBy]: order,
    },
  });

  return employees;
}