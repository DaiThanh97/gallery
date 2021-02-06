import Axios from 'axios';

class PictureService {
    fetchPictures = (offset, limit) => {
        return Axios.get(`${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&offset=${offset}&limit=${limit}`);
    }
}

export const pictureService = new PictureService();