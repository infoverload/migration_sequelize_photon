import * as express from 'express'
import * as bodyParser from 'body-parser'
import Photon from '@generated/photon'

const app = express()
app.use(bodyParser.json())

const photon = new Photon()

app.get('/users', async (req, res) => {
    const users = await photon.users.findMany()
    res.json(users)
})

app.get(`/users/:id`, async (req, res) => {
    const { id } = req.params
    const user = await photon.users.findOne({ 
        where: { 
          id: Number(id),
        },
    })
    res.json(user)
})
 
app.get('/tasks', async (req, res) => {
    const tasks = await photon.tasks.findMany({
       include: { users: true }
    })
    res.json(tasks)
})

app.post(`/tasks`, async (req, res) => {
  const { title, username } = req.body
  const post = await photon.tasks.create({
    data: {
        title,
        users: {
          create: [
            {
              username
            }
          ]
        }
    },
  })
  res.json(post)
})

app.delete(`/tasks/:id`, async (req, res) => {
  const { id } = req.params
  const task = await photon.tasks.delete({ 
    where: { 
        id: Number(id),
    },
  })
  res.json(task)
})

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000'),
)