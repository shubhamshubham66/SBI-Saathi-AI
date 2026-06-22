import { Schema, model, models, type Model, type Document } from "mongoose";
import {
  Gender,
  Occupation,
  SchemeCategory,
  type SchemeEligibility,
} from "@/types";

export interface SchemeDocument extends Document {
  name: string;
  slug: string;
  category: SchemeCategory;
  summary: string;
  benefits: string[];
  eligibility: SchemeEligibility;
  documentsRequired: string[];
  applicationSteps: string[];
  officialUrl?: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchemeEligibilitySchema = new Schema<SchemeEligibility>(
  {
    minAge: { type: Number, min: 0, max: 120 },
    maxAge: { type: Number, min: 0, max: 120 },
    maxMonthlyIncome: { type: Number, min: 0 },
    occupations: [{ type: String, enum: Object.values(Occupation) }],
    genders: [{ type: String, enum: Object.values(Gender) }],
    states: [{ type: String, trim: true }],
  },
  { _id: false }
);

const SchemeSchema = new Schema<SchemeDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    category: {
      type: String,
      enum: Object.values(SchemeCategory),
      required: true,
      index: true,
    },
    summary: { type: String, required: true },
    benefits: { type: [String], default: [] },
    eligibility: { type: SchemeEligibilitySchema, default: () => ({}) },
    documentsRequired: { type: [String], default: [] },
    applicationSteps: { type: [String], default: [] },
    officialUrl: { type: String, trim: true },
    tags: { type: [String], default: [], index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Scheme: Model<SchemeDocument> =
  (models.Scheme as Model<SchemeDocument>) ||
  model<SchemeDocument>("Scheme", SchemeSchema);

export default Scheme;
