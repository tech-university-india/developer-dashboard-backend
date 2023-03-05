const getPulseMap = (array) => {
  let pulse = array.map((item) => {
    const date = new Date(item.createdAt);
    const month = date.getMonth();
    return { pulse: item.pulse, month: month };
  });
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