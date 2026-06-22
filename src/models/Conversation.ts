import {
  Schema,
  model,
  models,
  Types,
  type Model,
  type Document,
} from "mongoose";
import {
  AgentStage,
  ConversationIntent,
  MessageRole,
  SUPPORTED_LANGUAGES,
  type ChatMessage,
  type LanguageCode,
  type MessageMeta,
} from "@/types";

const languageCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

export interface ConversationDocument extends Document {
  userId?: Types.ObjectId;
  title: string;
  language: LanguageCode;
  messages: ChatMessage[];
  lastIntent?: ConversationIntent;
  createdAt: Date;
  updatedAt: Date;
}

const MessageMetaSchema = new Schema<MessageMeta>(
  {
    intent: { type: String, enum: Object.values(ConversationIntent) },
    confidence: { type: Number, min: 0, max: 1 },
    viaVoice: { type: Boolean, default: false },
    stages: {
      type: [{ type: String, enum: Object.values(AgentStage) }],
      default: undefined,
    },
  },
  { _id: false }
);

const ChatMessageSchema = new Schema<ChatMessage>(
  {
    role: {
      type: String,
      enum: Object.values(MessageRole),
      required: true,
    },
    content: { type: String, required: true },
    language: { type: String, enum: languageCodes, default: "en" },
    meta: { type: MessageMetaSchema },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ConversationSchema = new Schema<ConversationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true, trim: true, default: "New chat" },
    language: { type: String, enum: languageCodes, default: "en" },
    messages: { type: [ChatMessageSchema], default: [] },
    lastIntent: { type: String, enum: Object.values(ConversationIntent) },
  },
  { timestamps: true }
);

export const Conversation: Model<ConversationDocument> =
  (models.Conversation as Model<ConversationDocument>) ||
  model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;
