import prisma from "../DB/db.config.js";

export const addDept = async (req, res) => {
    const { name } = req.body;
    const newDept = await prisma.department.create({
        data: {
          name: name,
        },
      });
    return res.json({ status: 200, data: newDept });
};
  