function hideFieldsPlugin(schema) {
  function transform(doc, ret) {
    const keysDelete = ["__v", "password", "id"];

    keysDelete.forEach((eachKey) => {
      delete ret[eachKey];
    });

    return ret;
  }
  schema.set("toObject", { transform });
  schema.set("toJSON", { transform });
}

module.exports = hideFieldsPlugin;

//virtuals: true,
