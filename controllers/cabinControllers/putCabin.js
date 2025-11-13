const Cabin = require("./../../models/cabinModel");
const NodeError = require("./../../utils/nodeError");

async function putCabin(req, res) {
  const requiredSchema = Object.keys(Cabin.schema.obj).filter(
    (eachKey) => Cabin.schema.obj[eachKey].required
  );

  if (
    requiredSchema.some((eachCol) => !Object.keys(req.body).includes(eachCol))
  ) {
    throw new NodeError(
      true,
      `Missing required fields for PUT: ${requiredSchema
        .filter((eachCol) => !Object.keys(req.body).includes(eachCol))
        .join(", ")}`,
      400
    );
  }

  const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cabin) {
    throw new NodeError(true, "Cabin not found!!", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
}

module.exports = putCabin;
