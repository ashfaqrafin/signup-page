//jshint esversion:6

const express=require("express");
const https=require("https");
const request=require("request");
const bodyParser=require("body-parser");



const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});



app.post("/",function(req,res)
{
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.ename;

    console.log(firstname,lastname,email);

    const data=
    {
        members:
        [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:
                {
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/a817e1fc38"

    const options=
    {
        method:"POST",
        auth:"ashfaq:071d09349aad474ff914de7f1db58ab7-us14"
    }

    const request=https.request(url,options,function(response)
    {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));

        });
    });
    request.write(jsonData);
    request.end();
    // a817e1fc38
    // 071d09349aad474ff914de7f1db58ab7-us14
});

app.post("/failure",function(req,res)
{
    res.redirect("/");
})
app.listen(3000,function()
{
    console.log("server is runnig perfectly");
});