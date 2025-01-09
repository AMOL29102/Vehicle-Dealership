const express = require('express');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../amazonS3/s3config');  // Assuming you have a configured S3 client
const router = express.Router();
const downloadLogFile = require('../adminControllers/logdownload.controller.js')

router.get('/download', downloadLogFile);

module.exports = router;
