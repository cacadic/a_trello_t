import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params: { boardId } }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return <div>Board ID</div>;
};

export default BoardIdPage;
