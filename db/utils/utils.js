exports.formatDates = list => {
  return list.map(art => {
    let {created_at, ...theRest} = art
    let dateFormat = new Date(created_at);
    return {...theRest,
      created_at: dateFormat}
  })
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
