const {compile}= require('ejs'); //why this is in const and not in var 
const express = require('express')
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node'
});
const app = express()
app.set('view engine','ejs');


app.get('/',function(req,res){
    if(req.query.submit)
    {
        var u=req.query.n;
        var p=req.query.c;
        con.query(`select * from uinfo  where uname = '${u}' and pass= '${p}'`  ,function(error,response){
           
            if(!error)
            {
                var x=0;
                response.forEach(element => {

                    x++;
                    
                });
                if(x>0)
            res.redirect('/database');
            else
            res.render('login',{msg:"invalid"})
            }
        })
    }
    else
    res.render('login',{msg:""})
  
})
app.get ('/register', function(req,res){
    if(req.query.submit)
    {    
        var n=req.query.n;
        var c=req.query.c;
        var e=req.query.e;
        var ph=req.query.ph;
        
        con.query(`insert into uinfo(uname,pass,email,phone)values('${n}','${c}','${e}',${ph})`,function(error,result){
          
            if(!error)
            res.redirect("/");
            else
            res.send("Could not Insert "+error);
        })
    }
    else
    res.render('register')

})

app.get('/about',function(req,res){
    var s="Ensino R&d PVT LTD";
    res.render('about',{data:s});
})
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/data',function(req,res){

    var mydata=[
        {"id":101,"name":"a","course":"mca"},
        {"id":102,"name":"b","course":"mca"},
        {"id":103,"name":"c","course":"mca"},
        {"id":104,"name":"d","course":"mca"},
        {"id":105,"name":"e","course":"mca"},
        {"id":106,"name":"f","course":"mca"},
        {"id":107,"name":"g","course":"mca"}
        
    ]
    res.render('data',{data:mydata});
})

app.get('/course',function(req,res){
    res.render('course');
})
app.get('/database',function(req,res){
    if(req.query.submit)
    {
        var n=req.query.i;
        con.query (`select * from student where name like'%${n}%' or school='${n}'`, function(error, result){
            if(!error)
            res.render("database", {data:result})
            else
            res.send ("Error to read database "+error);
        })
    }
    else
    {
    con.query ("select * from student", function(error, result){
        if(!error)
        res.render("database", {data:result})
        else
        res.send ("Error to read database "+error);
    })
}
})

app.get('/delData',function(req,res)
{   // why we did not use var her and what exactly this line means to the computer 
   id= req.query.delid;
    
con.query("delete from student where id="+id,function(error,response){

    if(!error)
    res.redirect('/database');
    else
    res.send("Could not Delete Record "+error)
})
}
)
app.get ('/insData', function(req,res){
    if(req.query.submit)
    {     //ask sir what does computer understand through this code pricisely dot(.)
        // ya what happen to the somputer when it read this code.
        var n=req.query.n;
        var c=req.query.c;
        var s=req.query.s;
        
        con.query(`insert into student(name,course,school)values('${n}','${c}','${s}')`,function(error,result){
            // why we used redirect insted of render 
            if(!error)
            res.redirect('/database');
            else
            res.send("Could not Insert "+error);
        })
    }
    else
    res.render('insData')

})

app.get('/upData',function(req,res)
{
    if(req.query.upid)
    {
    id=req.query.upid;
    
con.query("select * from student where id="+id,function(error,response){

    if(!error)
    res.render("update", {data:response})
    else
    res.send("Could not update Record "+error)
})
    }
    //how else works if its a if else a condtition and is there any other method to do this 
    else
    {
        var id=req.query.i; //how come it runs without calling any hing to the update button
        var n=req.query.n;
        var c=req.query.c;
        var s=req.query.s;
        con.query(`update student set name='${n}',course='${c}',school='${s}' where id=${id}`,function(error,resp){

            if(!error)
            res.redirect('/database');
            else
            res.send("Could not Update "+error);


        })

    }
})
app.get('/register',function(req,res){

    res.render('register');
})
.listen(5000)