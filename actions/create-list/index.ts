"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, title } = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: 1,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update board",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const creatList = createSafeAction(CreateList, handler);
