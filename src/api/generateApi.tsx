// src/api/spotify.ts
import axios from 'axios';

const clientId = 'df810985a967412184c71e67d1d09ca3';
const clientSecret = 'cf503cd8d21a4dc7b5eac6dbf490e178';
const tokenUrl = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async (): Promise<string> => {
  const response = await axios.post(tokenUrl, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};
