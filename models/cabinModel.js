const mongoose = require("mongoose");
const NodeError = require("../utils/nodeError");

const cabinSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now(),
  },

  cabin: {
    type: String,
    required: {
      value: true,
      message: "cabinName is required",
    },
  },
  capacity: {
    type: Number,
    required: {
      value: true,
      message: "Maximum capacity is required",
    },
  },
  price: {
    type: Number,
    required: {
      value: true,
      message: "Regular price is required",
    },
  },
  Discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        if (this.op === "findOneAndUpdate") return true;
        return this.price > value;
      },
      message: "Discount should be less than price",
    },
  },
  cabin_image: {
    type: String,
    required: {
      value: true,
      message: "cabin Image is required",
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: "Description for Cabin is required",
    },
  },
});

cabinSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this.options.runValidators) {
      const cabin = await this.model.findById(this.getQuery());
      const updateObj = this.getUpdate();
      console.log(this.getQuery());
      if (
        (updateObj["Discount"] ?? cabin["Discount"]) >
        (updateObj["price"] ?? cabin.price)
      ) {
        throw new NodeError(true, "Discount should be less than price", 400);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// cabinSchema.virtual("bookedCabins", {
//   ref: "booking",
//   localField: "_id",
//   foreignField: "cabinId",
// });

const Cabin = mongoose.model("cabin", cabinSchema);

module.exports = Cabin;
