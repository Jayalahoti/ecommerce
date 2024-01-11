const multer= require('multer');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        const uniquesuffix= Date.now();
        //const fileExtention= file.originalname.split('.').pop();
        //cb(null,file.fieldname+'-'+uniquesuffix+'.'+fileExtention);
        cb(null, uniquesuffix + file.originalname);
        // const fileExtention= file.originalname;
        // cb(null, file.fieldname+'-'+fileExtention);
    }
})

const fileFilter= (req,file,cb)=>{
    const allowedFileTypes=/jpeg|jpg|png/;
    const extname= allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype=allowedFileTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null,true);
    }else{
        cb("Error only JPEG/PNG/JPG files allowed");
    }
}

const upload= multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5 //Allow 5 MB
    },
    fileFilter:fileFilter
})

module.exports=upload;