import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the review"],
      trim: true,
      maxlength: 100,
    },
    text: { type: String, required: [true, "Please add some text"] },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, "Please add a rating between 1 and 10"],
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent user from submitting multiple reviews for the same bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: "$bootcamp", averageRating: { $avg: "$rating" } } },
  ]);

  // Update bootcamp with the average rating
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Update bootcamp with the average rating after saving
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

// Update bootcamp with the average rating before removing
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

export default mongoose.model("Review", ReviewSchema);
