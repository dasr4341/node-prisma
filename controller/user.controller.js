import prisma from "../DB/db.config.js";
import { responseLib } from "../lib/response.lib.js";
import { StatusCodes } from "http-status-codes";
import message from "../config/message.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, address, phone } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new Error(message.userDataExist());
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        address,
        phone,
      },
    });

    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq(),
      newUser
    );
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params?.id;

    const { name, address } = req.body;

    const isUserExist = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!isUserExist) {
      throw new Error(message.notFound("user"));
    }

    const updateUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        address,
      },
    });
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.dataUpdated("user"),
      updateUser
    );
  } catch (e) {
    next(e);
  }
};

export const fetchUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const allUsers = await prisma.user.findMany({
      where: {
        id: userId ? Number(userId) : undefined,
      },
      // include: {
      //   post: {
      //     select: {
      //       title: true,
      //       comment_count: true
      //     }
      //   }
      // },
      // include: {
      //   post: true
      // }
      // select: {
      //   _count: {
      //     select: {
      //       post: true,
      //       comment: true
      //     }
      //   }
      // }
    });

    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("user data fetched"),
      userId ? allUsers[0] : allUsers
    );
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const res = await prisma.user.delete({
      where: {
        id: Number(userId)
      },
    });

    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("user deleted successfully"),
      res
    );
  } catch (e) {
    next(e);
  }
};
