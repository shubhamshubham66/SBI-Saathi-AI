import {
  Schema,
  model,
  models,
  Types,
  type Model,
  type Document,
} from "mongoose";
import {
  FinancialGoal,
  Gender,
  Occupation,
  ProductType,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
  type RecommendedProduct,
  type UserProfile,
} from "@/types";

const languageCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

export interface RecommendationDocument extends Document {
  userId?: Types.ObjectId;
  profileSnapshot: UserProfile;
  products: RecommendedProduct[];
  language: LanguageCode;
  generatedBy: string;
  createdAt: Date;
}

const ProfileSnapshotSchema = new Schema<UserProfile>(
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

const RecommendedProductSchema = new Schema<RecommendedProduct>(
  {
    type: { type: String, enum: Object.values(ProductType), required: true },
    title: { type: String, required: true },
    reason: { type: String, required: true },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    ctaLabel: { type: String, default: "Learn more" },
    highlights: { type: [String], default: [] },
  },
  { _id: false }
);

const RecommendationSchema = new Schema<RecommendationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    profileSnapshot: { type: ProfileSnapshotSchema, required: true },
    products: { type: [RecommendedProductSchema], default: [] },
    language: { type: String, enum: languageCodes, default: "en" },
    generatedBy: { type: String, default: "rule-based" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Recommendation: Model<RecommendationDocument> =
  (models.Recommendation as Model<RecommendationDocument>) ||
  model<RecommendationDocument>("Recommendation", RecommendationSchema);

export default Recommendation;
