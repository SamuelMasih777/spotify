// src/api/spotify.ts
import axios from 'axios';
export interface Track {
    name: string;
    popularity: number;
    [key: string]: any;
  }
  
  export const fetchSongs = async (accessToken: string): Promise<Track[]> => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: 'year:2023 genre:indian',
          type: 'track',
          market: 'IN',
          limit: 50
        }
      });
      return response.data.tracks.items;
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  };
  