import axios from 'axios';

export const fetchLivres = async () => {
  try {
    const response = await axios.get('https://gahi-said.com/apis/auteurs.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

