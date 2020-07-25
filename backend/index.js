const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const pool = require('./postgres');

app.use(cors())
app.use(express.json())

//Create new todo.
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todos (t_description, t_complete) VALUES ($1,false) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//Get all todos.
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todos ORDER BY t_id DESC");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//Get specific todo by id.
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todos WHERE t_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//Update specific todo by id.
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query(
            "UPDATE todos SET t_description = $1 WHERE t_id = $2",
            [description, id]
        );
        res.json("Todo has been updated");
    } catch (error) {
        console.log(error.message);
    }
})

//Delete specific todo by id.
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todos WHERE t_id = $1", [id]);
        res.json("Todo has been deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

//Toggle todo list
app.put('/todos/toggletodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT t_complete FROM todos WHERE t_id = $1", [id]);
        await pool.query(
            "UPDATE todos SET t_complete = $1 WHERE t_id = $2",
            [!todo.rows[0].t_complete, id]
        );
        res.json("Todo has been toggled.");
    } catch (error) {
        console.log(error.message);
    }
})

//Filter todo list
app.get('/todos/filter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let filterTodos = null;
        switch (id) {
            case '0':
                filterTodos = await pool.query("SELECT * FROM todos ORDER BY t_id DESC")
                break
            case '1':
                filterTodos = await pool.query("SELECT * FROM todos WHERE t_complete = true ORDER BY t_id DESC");
                break
            case '2':
                filterTodos = await pool.query("SELECT * FROM todos WHERE t_complete = false ORDER BY t_id DESC");
                break
            default:
                filterTodos = await pool.query("SELECT * FROM todos ORDER BY t_id")
                break
        }
        res.json(filterTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port,
    () => console.log(`Server started at http://localhost:${port}`)
)