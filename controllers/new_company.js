const express = require('express');
const models = require('../models');

const router = express.Router();

const s3 = require('s3');
const multer = require('multer');
const path = require('path');

const upload = multer({dest: './temp/'});
const s3BucketName = 'solowsportsimages';
const s3Region = 'us-east-2';

// TODO: Load from config file

const client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520,
    multipartUploadSize: 15728640,
    s3Options: {
      accessKeyId: 'AKIAJW2X2RMKR6BM22LQ',
      secretAccessKey: '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',
      region: s3Region,
    },
});

router.post('/', upload.single('file'), (req, res) => {
    
    const ext = path.extname(req.file.originalname);
    // Validate image file here
    const tempFile = `${req.file.destination}${req.file.filename}`; // temp/FILENAME
    const s3KeyLocation = `user_content/${req.file.filename}${ext}`; // Folder to store in S3
    const params = {
        localFile: tempFile,
        s3Params: {
            Bucket: s3BucketName,
            Key: s3KeyLocation, 
            ACL: 'public-read',
        },
    };

    const uploader = client.uploadFile(params);
    uploader.on('error', (err) => {
        console.error('Unable to Upload', err.stack);
    });
    uploader.on('progress', () => {
        // console.log('Progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
    });
    uploader.on('end', () => {
        const s3Url = s3.getPublicUrlHttp(s3BucketName, s3KeyLocation, s3Region);
        // Create Company
        models.Company.create({
          company_name: req.body.company_name,
          image_URL: s3Url,
        });
        fs.unlink(tempFile);
        // Redirect to photo page
        // res.sendStatus(200);
        res.render('home');
    });
    console.log('hello');
});

module.exports = router;
