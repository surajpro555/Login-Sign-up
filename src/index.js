const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const templatePath=path.join(__dirname,'../templates')
const collection=require('./mongodb')

app.use(express.json())
app.use(express.static('public'))
app.set('view engine','hbs')
app.set('views',templatePath)
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/sign',(req,res)=>{
    res.render('sign')
})

app.post('/login',async (req,res)=>{
    const msg={ name:``};
    try {
        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password)
        {
            res.render('home',check)
        }
        else{
            msg.name=`Wrong Details`;
            res.render('login',msg)
        }
    } catch (error) {
        msg.name='Wrong Details'
        res.render('login',msg)
    }
})
app.post('/sign',async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    const msg={ name:``};
        try{
           const count=await collection.count({name:req.body.name})
           if(count>0)
           {
              msg.name=`Account already exist`
              res.render('sign',msg)
           }
           else
           {
             await collection.insertMany([data])
             res.render('login')
           }
        }
        catch(err)
        {
           alert('Server Error.............')  
        }
})
app.listen(2000,()=>{
    console.log('Server connected....\nserver runing on port 2000')
})