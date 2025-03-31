import prisma from "../DB/db.config.js";
import { responseLib } from "../lib/response.lib.js";
import { StatusCodes } from "http-status-codes";
import message from "../config/message.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        user_id: Number(userId),
      },
    });
      
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq(),
      newPost
    );
  } catch (e) {
    next(e);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const { description } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        description,
      },
    });
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("Post updated successfully !"),
      updatedPost
    );
  } catch (e) {
    next(e);
  }
};

export const fetchPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const response = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
    });
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq(response?.id ? "Post fetched successfully !!" : "No Post found !!"),
      response
    );
  } catch (e) {
    next(e);
  }
};

export const fetchAllPost = async (req, res, next) => {
  try {
    const allPost = await prisma.post.findMany({});
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("all post fetched successfully !!"),
      allPost
    );
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const response = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("post deleted successfully !!"),
      response
    );
  } catch (e) {
    next(e);
  }
};
