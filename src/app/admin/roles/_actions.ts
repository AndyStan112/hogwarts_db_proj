"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  if (!checkRole("admin")) {
    throw new Error("Not Authorized");
  }

  try {
    await client.users.updateUser(formData.get("id") as string, {
      publicMetadata: { role: formData.get("role") },
    });
  } catch (err) {
    throw new Error(`Failed to update role: ${err}`);
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  try {
    await client.users.updateUser(formData.get("id") as string, {
      publicMetadata: { role: "guest" },
    });
  } catch (err) {
    throw new Error(`Failed to remove role: ${err}`);
  }
}
