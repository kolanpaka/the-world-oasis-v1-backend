const Cabin = require("./../../models/cabinModel");
const getSort = {
  "name-asc": "cabin",
  "name-desc": "-cabin",
  "regularPrice-asc": "price",
  "regularPrice-desc": "-price",
  "maxCapacity-asc": "capacity",
  "maxCapacity-desc": "-capacity",
};

const getDiscount = {
  "no-discount": { Discount: 0 },
  "with-discount": { Discount: { $ne: 0 } },
  all: {},
};

async function getCabins(req, res) {
  let query = Cabin.find();

  const { discount, sortBy } = req.query;

  if (discount) {
    query = query.find(getDiscount[discount]);
  }
  if (sortBy) {
    query = query.sort(getSort[sortBy]);
  }

  const cabins = await query;
  res.status(200);
  res.json({
    status: "success",
    totalLength: cabins.length,
    data: {
      cabins,
    },
  });
}

module.exports = getCabins;
