import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  return (
    <div>
      OrganizationIdPage
    </div>
  );
};

export default OrganizationIdPage;
