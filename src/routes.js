const getRandomText = function(req,res,next) {
  let queries = req.app.queries;
  queries.allPassages()
  .then(function(passages){
    let passage = selectPassage(passages);
    let text = `var text = "${passage}"`;
    res.set('Content-Type', 'text/javascript');
    res.write(text);
    res.end();
  }).catch(function(err){
    console.log(err);
    res.status(500);
    res.json(err);
  });
}

const selectPassage = function (passages) {
  let randomIndex = Math.floor(Math.random() * passages.length);
  return passages[randomIndex].passage;
};


const saveText = function (req, res) {
  let queries = req.app.queries;
  console.log(req.body);
  queries.addPassage(req.body.text)
  .then(function(){
    res.redirect('/index.html');
  })
  .catch(function(err){
    res.status(500);
    res.json(err);
  })
};

module.exports = {
  getRandomText,
  saveText
}