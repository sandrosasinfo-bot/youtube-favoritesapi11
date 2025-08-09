const express = require('express');
const axios = require('axios');
const path = require('path'); // Para servir arquivos estáticos
const app = express();

const YOUTUBE_API_KEY = 'AIzaSyCtVKlLR8QZrxt8H4mxmunRHeZYSB8pnak'; // Substitua com sua chave da API do YouTube
const PLAYLIST_ID = 'PLY9B-tdb_olFlRVr-_pcAAC4z8Qw_HHqG'; // Substitua com o ID da sua playlist

// Servir arquivos estáticos da pasta 'public' (onde estará o HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para pegar as músicas da playlist
app.get('/api/playlist', async (req, res) => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
        const response = await axios.get(url);
        const songs = response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            thumbnail: item.snippet.thumbnails.medium.url,
        }));
        res.json(songs); // Retorna as músicas em formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar a playlist.');
    }
});

// Configuração do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
