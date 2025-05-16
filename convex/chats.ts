import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
  },
});

export const add = mutation({
  args: {
    ai: v.string(),
    answer: v.string(),
    question: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { ai, answer, question, userId }) => {
    return await ctx.db.insert("chats", { ai, answer, question, userId });
  },
});

export const deleteChat = mutation({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
