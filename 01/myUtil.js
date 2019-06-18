const path = require('path');	
const readline = require('readline');	
const fs = require('fs');	
const http = require('http');	

 // ===============================================create file in specified directory ===================================================	
// We work with input process 	
const rl = readline.createInterface({	
  input: process.stdin,	
  output: process.stdout,	
  prompt: 'Hello Mentor'	
});	

 rl.prompt();	

 rl.on('line', input =>{	
	const[dirNameWithFile ,...contentFile ] = input.split(' '); //the first written part it is path, the second file it is content 	
	const text = contentFile.join(' ');//leave spaces	
	const pathwayDirectory = path.parse(dirNameWithFile);	
	// make a directory	
	fs.mkdir(pathwayDirectory.dir ,{ recursive: true }, function() {	
		const makeDirectory = path.join(__dirname, pathwayDirectory.dir ,pathwayDirectory.base );	
		  	fs.writeFile(makeDirectory, text , function(err) {	
				    if(err) {	
				        throw err;	
				    }	
		    console.log("The file was saved!");	
			});	
	});	
rl.close();	
})	
// =========================================server==============================================	
const request = (req,res)=>{	
  const fullPath = (path.join(__dirname + req.url));//absolute file path	
  let check = fs.existsSync(fullPath);//check the availability of documents	
  res.setHeader("Cache-control", "no-cache");	

   if (check) {	
  	//if the file is there we read it	
  	const text = fs.readFile(fullPath,'utf-8',(error,data)=>{	
  		if (error){	
  			console.error(error.message);	
  		}else{ 	
  			res.end(data);	
  		};	
  	});	
  	// if there is no 404 file	
  } else {	
    res.statusCode = 404;	
    res.end("Not found");	
  }	
};	


 const server = http.createServer(request); 	
server.listen(3000,()=>console.log('\nmy server is working!'));	