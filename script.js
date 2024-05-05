const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/download', (req, res) => {
    const videoUrl = req.query.url;
    const video = ytdl(videoUrl, { filter: 'audioandvideo' });

    const savePath = './public/videos/video.mp4';

    video.pipe(fs.createWriteStream(savePath));

    video.on('end', () => {
        res.send({ status: 'success', message: 'Video berhasil diunduh.', videoUrl: '/videos/video.mp4' });
    });

    video.on('error', (error) => {
        res.status(500).send({ status: 'error', message: 'Terjadi kesalahan saat mengunduh video.', error: error });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
