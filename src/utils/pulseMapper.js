const getPulseMap = (array) => {
  const y_axis = [
    {
      name: 'Terrible',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Ok',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Good',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];
  if (!array || array.length === 0) {
    return y_axis;
  }
  let pulse = array.map((item) => {
    const date = new Date(item.createdAt);
    const month = date.getMonth();
    return { pulse: item.score, month: month };
  });
  pulse.forEach((item) => {
    if (item.pulse <= 2) {
      y_axis[0].data[item.month] = y_axis[0].data[item.month] + 1;
    } else if (item.pulse === 3) {
      y_axis[1].data[item.month] = y_axis[1].data[item.month] + 1;
    } else {
      y_axis[2].data[item.month] = y_axis[2].data[item.month] + 1;
    }
  });
  return y_axis;
};

module.exports = { getPulseMap };