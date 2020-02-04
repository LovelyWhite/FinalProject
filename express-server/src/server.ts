const express = require('express')
const app = express()
app.use(express.json())
app.get('/', async (req, res) => res.send('Hello World!'))

app.get('/api/bd-map',async(req,res)=>{
    res.send('ok')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))