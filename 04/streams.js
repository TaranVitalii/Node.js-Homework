// const express = require('express');
// const app = express();




// app.use(express.static('public'));
// const server = app.listen(8000,()=>console.log('server work'));

const path = require("path");
const fs = require("fs");
const url = require("url");
const formidable = require('formidable');
const server = require("http").createServer().listen(8000, ()=>console.log('Севрер работает'));;

server.on("request", onRequest);
function hendlerError(error,res){
	res.writeHead(500,{'Content-Type':'text/plain'});
	res.end(error.message);
};

function onRequest(req,res){
	switch(req.method){
		case 'GET':
			const stream = fs.createReadStream(path.join(__dirname,'public','index.html'));
			res.writeHead(200,{'Content-Type':'text/html'});
			stream.pipe(res);
			break;
		}; 
			if (req.url == '/fileupload') {
		    let form = new formidable.IncomingForm();
		    console.log(form);
		    form.parse(req, function (err, fields, files) {
		    let oldpath = files.filetoupload.path;
		    let newpath = __dirname +'/' + files.filetoupload.name;
		    console.log(__dirname);
		    fs.rename(oldpath, newpath, function (err) {
		    if (err) throw err;
		    res.write('File uploaded and moved!');
		    res.end();
		      });
			// const stream = fs.createReadStream(path, options);
			// let body;
			// req.on('data', data => body += data);
			// req.on('end', ()=>console.log(body))

		});
	  };
	
};


	// else {
	// 	res.writeHead(404,{'Content-Type':'text/plain'});
	// 		res.end('404 не найдено');
	// }

// }