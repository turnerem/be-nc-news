exports.formatDates = list => {
  return list.map(art => {
    let {created_at, ...theRest} = art
    let dateFormat = new Date(created_at);
    return {...theRest,
      created_at: dateFormat}
  })
};

// comments: remove belongs_to and replace with article_id
// articles: key is title, value is article_id
exports.makeRefObj = list => {

  const refObj = {};
  list.forEach((article) => {
    if (!article.hasOwnProperty('title') || !article.hasOwnProperty('article_id')) {
      
    }
    refObj[article.title] = article.article_id
  })
  return refObj
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    if (!comment.hasOwnProperty('belongs_to')) {
      
    }

    let { belongs_to, created_by, ...theRest } = comment;
    return {
      ...theRest,
      author: created_by,
      article_id: articleRef[belongs_to]}
  })
};

