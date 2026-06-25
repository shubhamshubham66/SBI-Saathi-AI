import {
  Schema,
  model,
  models,
  Types,
  type Model,
  type Document,
} from "mongoose";

/** Severity levels for audit/security events. */
export type AuditSeverity = "info" | "warning" | "critical";

/** Canonical audit event types (extend as features grow). */
export type AuditAction =
  | "auth.login.success"
  | "auth.login.failed"
  | "auth.logout"
  | "auth.token.refresh"
  | "auth.otp.sent"
  | "auth.otp.verified"
  | "auth.otp.failed"
  | "security.rate_limited"
  | "security.csrf_rejected"
  | "security.suspicious_input"
  | "contact.submitted"
  | "subscribe.submitted"
  | "access.denied";

export interface AuditLogDocument extends Document {
  userId?: Types.ObjectId;
  action: AuditAction;
  severity: AuditSeverity;
  ip?: string;
  userAgent?: string;
  route?: string;
  detail?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<AuditLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true, index: true },
    severity: {
      type: String,
      enum: ["info", "warning", "critical"],
      default: "info",
      index: true,
    },
    ip: { type: String },
    userAgent: { type: String },
    route: { type: String },
    detail: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Retain audit logs for 365 days (TTL index). Adjust per compliance policy.
AuditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

export const AuditLog: Model<AuditLogDocument> =
  (models.AuditLog as Model<AuditLogDocument>) ||
  model<AuditLogDocument>("AuditLog", AuditLogSchema);

export default AuditLog;
