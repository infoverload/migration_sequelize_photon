var models  = require('../models');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(() => {
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
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
