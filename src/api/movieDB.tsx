import axios from 'axios';


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '7e0914f9878743daed0dcfb28ee89b3d',
        language: 'es-Es'
    }
})

export default movieDB;