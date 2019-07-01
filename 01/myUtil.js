const path = require('path');	
const readline = require('readline');
const url = require('url');	
const fs = require('fs');	
const http = require('http');	

const pathToFiles = path.join(__dirname,'files');

 // ===============================================create file in specified directory ===================================================	
// We work with input process 	
const rl = readline.createInterface({	
  input: process.stdin,	
  output: process.stdout,	
});	

 rl.prompt();	

function makeDirAndWriteFile(input){	
	const[dirNameWithFile ,...contentFile ] = input.split(' '); //the first written part it is path, the second file it is content 	
	const text = contentFile.join(' ');//leave spaces	
	const {dir, base} = path.parse(dirNameWithFile);
		// make a directory	
	if(dir){
	const pathToDir = path.join(pathToFiles, dir)
	fs.mkdirSync(pathToDir,{ recursive: true });	
	}	//write text in file
	const pathToFile = dir
	 ? path.join(pathToFiles ,dir ,base)
	 : path.join(pathToFiles , base );
		
		  	fs.writeFileSync(pathToFile, text);	
rl.close();	
}

 rl.on('line', makeDirAndWriteFile);
// =========================================server==============================================	
const requestHandler = (req,res)=>{	
  const { pathname } = url.parse(req.url);//absolute file path
  const pathToFiles = path.join(__dirname)
  const pathToFile = path.join(pathToFiles, pathname);	

  const isFileExist = fs.existsSync(pathToFile);//check the availability of documents	
  res.setHeader("Cache-control", "no-cache");	

   if (isFileExist) {	
  	//if the file is there we read it	
  	fs.readFile(pathToFile,(error,data)=>{	
  		if (error){	
  			res.statusCode = 404;	
  			res.end("Not found");	
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


 const server = http.createServer(requestHandler); 	
server.listen(3000,()=>console.log('\nmy server is working!'));	