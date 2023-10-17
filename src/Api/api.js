export const PER_PAGE = 12;
export async function getImages(inputValue, page = 1) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '39190651-040f5f399f947f125b5c14c8f';

  return await fetch(
    `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(res => res.json());
}