import axios from "axios";


const MY_API_KEY = '39190651-040f5f399f947f125b5c14c8f';
const BASE_URL = 'https://pixabay.com/api/';

    
export async function fetchArticles(searchQuery, page, perPage) {   
    const url = BASE_URL;
    const params = {
        key: MY_API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: perPage,
    };

    const response = await axios.get(url, {params});
        return response.data;
};