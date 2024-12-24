export {};

export type Roles = "admin" | "student" | "teacher" | "guest";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
