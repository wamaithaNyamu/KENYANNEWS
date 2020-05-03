module.exports = (app) =>{
    const news = require('../controllers/news.controller.js');

    //get all news
    app.get('/', news.findAll);

}