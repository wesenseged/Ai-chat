import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chats: defineTable({
    ai: v.string(),
    answer: v.string(),
    question: v.string(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),
});
