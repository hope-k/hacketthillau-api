const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: {
        values: ["transfer", "deposit"],
      },
      default: "transfer",
    },
    payeeAccountNumber: {
      type: String,
    },
    payeeRoutingNumber: {
      type: String,
    },
    memo: {
      type: String,
    },
    bankName: {
      type: String,
    },
    from: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "pending",
          "declined",
          "sent",
          "complete",
          "on-hold",
          "awaiting-approval",
          "refunded",
          "failed",
          "reversed",
        ],
        message:
          "Transaction status must be one of pending, declined, sent, complete, on-hold, awaiting-approval, refunded, reversed",
      },
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    accountId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

transactionSchema.plugin(paginate);

module.exports = mongoose.model("Transaction", transactionSchema);
