/**
 * Barrel file for all Mongoose models.
 * Import from "@/models" anywhere in the app.
 */
export { User, type UserDocument } from "./User";
export { Conversation, type ConversationDocument } from "./Conversation";
export {
  Recommendation,
  type RecommendationDocument,
} from "./Recommendation";
export { Scheme, type SchemeDocument } from "./Scheme";
