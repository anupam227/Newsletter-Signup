const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
	const fname = req.body.FName;
	const lname = req.body.LName;
	const email = req.body.email;
	

	const data = {
		members: [
		{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: fname,
				LNAME: lname
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us2.api.mailchimp.com/3.0/lists/6b009493ed"

	const options = {
		method: "POST",
		auth: "anupam:765c16664960c762a56eda5c765d1c22-us2"
	}
	const request = https.request(url,options, function(response){
		if(response.statusCode === 200){
			res.sendFile(__dirname + "/success.html");
		}else{
			res.sendFile(__dirname + "/failure.html");
		}

		response.on("data",function(data){
			console.log(JSON.parse(data));
		})
	})

	//request.write(jsonData);
	request.end();
})

app.post("/failure",function(req,res){
	res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
	console.log("server is running");
})

//api key
//765c16664960c762a56eda5c765d1c22-us2

//unique key
//6b009493ed