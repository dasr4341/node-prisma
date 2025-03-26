import prisma from "../DB/db.config.js";
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

export const addDept = async (req, res) => {
  try {
    const { name } = req.body;
    mySchema.parse(name);

    const newDept = await prisma.department.create({
      data: {
        name: name,
      },
    });
    return res.json({ status: 200, data: newDept });
  } catch (e) {
    throw new Error(e);
  }
};
