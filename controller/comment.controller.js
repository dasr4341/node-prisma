import prisma from "../DB/db.config";
import { responseLib } from "../lib/response.lib.js";
import { StatusCodes } from "http-status-codes";
import message from "../config/message.js";

export const createComment = async (req, res, next) => {
  try {
    const { comment, userId, postId } = req.body;
    const response = await prisma.comment.create({
      data: {
        comment,
        user_id: Number(userId),
        post_id: Number(postId),
      },
    });
      
      await prisma.post.update({
          where: {
              id: Number(postId)
          },
          data: {
              comment_count: {
                  increment: 1
              }
          }
      })

    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq(),
      response
    );
  } catch (e) {
    next(e);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params?.commentId;
    const { comment, userId, postId } = req.body;
    const response = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        comment,
        user_id: Number(userId),
        post_id: Number(postId),
      },
    });

    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq(),
      response
    );
  } catch (e) {
    next(e);
  }
};

export const fetchAllComments = async (req, res, next) => {
  try {
    const response = await prisma.comment.findMany({});
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("All comments fetched successfully !!"),
      response
    );
  } catch (e) {
    next(e);
  }
};


export const fetchCommentById = async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
  
      const response = await prisma.comment.findFirst({
        where: {
          id: (commentId),
        },
      });
      return responseLib.success(
        res,
        StatusCodes.OK,
        message.successReq(response?.id ? "Comment fetched successfully !!" : "No Comment found !!"),
        response
      );
    } catch (e) {
      next(e);
    }
  };

export const deleteComments = async (req, res, next) => {
  try {
    const commentId = req.params?.commentId;
    const response = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return responseLib.success(
      res,
      StatusCodes.OK,
      message.successReq("Comment deleted successfully !!"),
      response
    );
  } catch (e) {
    next(e);
  }
};
