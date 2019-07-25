module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    app.post('/register',function(req,res){
       var username = req.body.username;
       var htmlData = 'Hello:' + username;
       res.sendFile(__dirname + '/index.html');
       console.log(htmlData);
    });
    console.log('Authenticated.');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
      console.log('Not authenticated? Checking..');
    }
    console.log('Not authenticated.');
    app.post('/register',function(req,res){
       var username = req.body.username;
       var htmlData = 'Hello:' + username;
       res.sendFile(__dirname + '/register.html');
       console.log(htmlData);
    });
  }
};
