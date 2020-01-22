var express = require('express');
var router = express.Router();

var actions = ["subs", "adds"];
var levels = ["1", "2"];

router.get('/', function (req, res) {
	res.render("views/index");
});

router.get('/:action/:level', function (req, res) {
	var view = {};
	view.action = req.params.action;
	view.level = req.params.level;

	if(!actions.includes(view.action))
		res.sendStatus("404").send("This page doesn't exist!");
	if(!levels.includes(view.level))
		res.sendStatus("404").send("This page doesn't exist!");


	switch(view.action)
	{
		case "adds":
			view.pageTitle = "Addition" + (view.level=="1"?"":" & Multiplication");
			break;
		case "subs":
			view.pageTitle = "Substraction" + (view.level=="1"?"":" & Division");
			break;	
	}


	view.jsName = "/js/"+view.action+"/"+view.level+"/script.js";
	res.render('views/math', { 'view': view });

});


//Instead of serving static Javascript file, serve bundled JS through a route.
//This can be used to filter the Javascript served based on user's scope of access/control
//For more information check /app/engine/core.ejs file
router.get("/js/:action/:level/script.js", function(req,res){
	var view = {};
	view.action = req.params.action;
	view.level = req.params.level;
	res.render('js/core', { 'view': view });
})

module.exports = router;