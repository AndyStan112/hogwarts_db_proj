import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const accessLevel = { admin: 4, teacher: 3, student: 2, guest: 1 };
export const checkRole = async (requiredRole: Roles) => {
  const userRole = await getRole();
  return userRole === requiredRole;
};
export const checkAccess = async (requiredRole: Roles) => {
  const userRole = await getRole();
  if (!userRole) return false;

  return accessLevel[userRole] >= accessLevel[requiredRole];
};
export const getRole = async () => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role;
};
