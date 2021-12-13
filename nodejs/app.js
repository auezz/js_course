let formidable = require('formidable');
let http = require('http');
let fs = require('fs');

http.createServer(function(req,res){
    if(req.url == '/fileupload'){
        let form = new formidable.IncomingForm();
        console.log(`form ${form}`);
        form.parse(req, function(err, fields, files){
           let oldpath = files.fileupload.filepath;
           console.log(oldpath, files.fileupload.filepath);
           let newPath = `C:/xampp/htdocs/git/js_course/nodejs/img/${files.fileupload.originalFilename}`;
           fs.rename(oldpath, newPath, function(err){
                if(err) throw err;
                res.write('File uploaded!!!!');
                res.end();
           });
           
        })
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<form action="fileupload" method="post" enctype="multipart/form-data">
                        <input type="file" name="fileupload">
                        <br>
                        <input type="submit">
                    </form>`);
        return res.end();        
    }
    
                    

}).listen(8000);