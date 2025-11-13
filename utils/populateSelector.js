function populateSelector(select, populateKeys, query) {
  const selectArray = select?.split(",") || [];
  const selector = Object.fromEntries(
    populateKeys.map((eachKey) => [eachKey, []])
  );

  selector.default = [];

  for (let eachSelect of selectArray) {
    if (eachSelect.includes(".")) {
      let [key, value] = eachSelect.split(".");
      key = key.startsWith("-") ? key.slice(1) : key;
      if (populateKeys.includes(key)) {
        selector[key].push(eachSelect.startsWith("-") ? `-${value}` : value);
      }
      continue;
    }
    selector.default.push(eachSelect);
  }

  populateKeys.forEach((field) => {
    const excludeKey = `-${field}`;

    const shouldPopulate =
      !selector.default.includes(excludeKey) &&
      (selector.default.length === 0 ||
        selector.default.includes(field) ||
        selector.default.some(
          (sel) => sel.startsWith("-") && sel !== excludeKey
        ));

    if (shouldPopulate) {
      query.populate({ path: field, select: selector[field].join(" ") });
    }
  });

  return selector;
}

module.exports = populateSelector;
