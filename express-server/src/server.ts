const express = require('express')
const app = express()
app.set('views', './src/page')
app.set('view engine', 'ejs')
app.get('/', async (req, res) => res.send('首页'))

app.get('/page/bd-map',async(req,res)=>{
    res.render('bd-map')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))