import { Schema, model, models, type Model, type Document } from "mongoose";
import {
  Gender,
  Occupation,
  FinancialGoal,
  UserRole,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
  type UserProfile,
} from "@/types";

const languageCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

/** Mongoose document type for a User (timestamps added by the schema). */
export interface UserDocument extends Document {
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  preferredLanguage: LanguageCode;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<UserProfile>(
  {
    age: { type: Number, min: 0, max: 120 },
    gender: { type: String, enum: Object.values(Gender) },
    occupation: { type: String, enum: Object.values(Occupation) },
    monthlyIncome: { type: Number, min: 0 },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    financialGoals: {
      type: [{ type: String, enum: Object.values(FinancialGoal) }],
      default: [],
    },
  },
  { _id: false }
);

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    phone: { type: String, trim: true, sparse: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },
    preferredLanguage: {
      type: String,
      enum: languageCodes,
      default: "en",
    },
    profile: { type: UserProfileSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> =
  (models.User as Model<UserDocument>) ||
  model<UserDocument>("User", UserSchema);

export default User;
