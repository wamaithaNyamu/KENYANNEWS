const NEWS = require('../models/getfinal.model.js');
//get all urls
//retrieves everythingggg
exports.findAll = (req,res) =>{
    NEWS.find().then(
        allNews => {
            res.render('index.ejs', {
                user: req.user,
                allNewsData : allNews
            });

        }).catch(err =>{
        res.status(500).send({
            message : err.message || "some error occured while retrieving hashtags"
        });
    });
};
