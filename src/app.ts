import * as express from "express";
import * as bodyParser from "body-parser";
import models, { sequelize } from './models';

const app = express();
app.use(bodyParser.json());

    app.get('/', function(req, res) {

        models.User.findAll({
            include: [ models.Task ]
        }).then(function(users) {
            res.render('index', {
                title: 'Sequelize: Express Example',
                users: users
            });
        });
    });
    
    app.post('/create', function(req, res) {
        models.User.create({
            username: req.body.username
        }).then(function() {
            res.redirect('/');
        });
    });
        
    app.get('/:user_id/destroy', function(req, res) {
        models.User.destroy({
            where: {
            id: req.params.user_id
            }
        }).then(function() {
            res.redirect('/');
        });
    });
        
    app.post('/:user_id/tasks/create', function (req, res) {
        models.Task.create({
            title: req.body.title,
            UserId: req.params.user_id
        }).then(function() {
            res.redirect('/');
        });
    });
        
    app.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
        models.Task.destroy({
            where: {
            id: req.params.task_id
            }
        }).then(function() {
            res.redirect('/');
        });
    });

  sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`)
    });
  });