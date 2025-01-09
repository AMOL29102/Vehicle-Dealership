const express = require('express');
const { downloadTodaysLogsFromS3 } = require('../amazonS3/s3config.js');

const downloadLogFile = async (req, res) => {
    try {
        const logs = await downloadTodaysLogsFromS3();

        if (!logs) {
            console.log("No logs found.");
            return res.status(404).send('Log file not found.');
        }
        
        
        // Set the response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${new Date().toISOString().split("T")[0]}.csv"`);
        
        // Send the logs
        res.send(logs);

    } catch (error) {
        console.error("Error downloading today's log:", error);
        res.status(500).send('Error downloading the log file');
    }
};

module.exports = downloadLogFile;