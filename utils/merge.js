const mergeDateRanges = (ranges) => {
  // Sort by start date
  ranges.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    // If overlapping or consecutive (end == start)
    if (new Date(current[0]) <= new Date(last[1])) {
      last[1] = new Date(current[1]) > new Date(last[1]) ? current[1] : last[1];
    } else {
      merged.push(current);
    }
  }

  return merged;
};

module.exports = mergeDateRanges;
