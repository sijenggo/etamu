import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = `https://etamu.pn-banyumas.go.id/backend/api`;

export const ambil_data = async (query) => {
  try {
    const response = await axios.post(`${BASE_URL}ambil_data`,{ query });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const tambah_data = async (table, data) => {
  try {
    const response = await axios.post(`${BASE_URL}tambah_data`, { table, data }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const edit_data = async(id, data) => {
  try{
    const response = await axios.post(`${BASE_URL}edit_data`, {id , data},{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }catch (error){
    console.error('Error update data:', error);
    throw error;
  }
};

export const generateRandomString = (length) =>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const formattedDate = (date) =>{
  return format(date, 'yyyy-MM-dd');
};