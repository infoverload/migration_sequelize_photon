import * as express from "express";
import * as bodyParser from "body-parser";
import models, { sequelize } from './models';

const app = express();
app.use(bodyParser.json());

// Define routes
app.get('/users', async (req, res) => {
    const users = await models.User.findAll();
    return res.send(users);
});

app.get('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(
        req.params.userId,
    );
    return res.send(user);
});

app.get('/tasks', async (req, res) => {
    const tasks = await models.Task.findAll();
    return res.send(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = await models.Task.create({
        title: req.body.title,
    });

    return res.send(task);
});

app.delete('/tasks/:taskId', async (req, res) => {
    const result = await models.Task.destroy({
        where: { id: req.params.taskId },
    });

    return res.send(true);
});


// Start
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    console.log(`Database & tables created!`);
    createUsersWithTasks();
  }

  app.listen(3000, () =>
    console.log(`Example app listening on port 3000`),
  );
});

// Seed database 
const createUsersWithTasks = async () => {
  await models.User.create(
    {
      username: 'Jane',
      tasks: [
        {
          title: 'Pick up laundry',
        },
      ],
    },
    {
      include: [models.Task],
    },
  );

  await models.User.create(
    {
      username: 'John',
      tasks: [
        {
          title: 'Call the doctor',
        },
        {
          title: 'Do groceries',
        },
      ],
    },
    {
      include: [models.Task],
    },
  );
};