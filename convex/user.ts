import { query } from "./_generated/server";

export default query(async (ctx) => {
  const user = await ctx.auth.getUserIdentity();

  if (user === null) {
    return null;
  }

  return user.tokenIdentifier;
});
