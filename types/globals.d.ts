export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      organizationComplete?: boolean;
    };
  }
}
