import React, { useEffect, useState } from 'react';
import { fetchSongs } from '../api/spotify';
import { getAccessToken } from '../api/generateApi';
import BarChart from './barchart';
import LineChart from './LineChart';
import FilterModal from './Modal';
import Fuse from 'fuse.js';
import HorBarChart from './HorizontalBar';
import { useNavigate } from 'react-router-dom';

interface Track {
    name: string;
    popularity: number;
    [key: string]: any;
}

interface Artist {
  name: string;
}

const Dashboard: React.FC = () => {
  const [songs, setSongs] = useState<Track[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        const songsData = await fetchSongs(token);
        setSongs(songsData);
        setFilteredSongs(songsData);
      } catch (error) {
        setError('Failed to fetch data from Spotify API');
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filters: { minPopularity: number; maxPopularity: number; artist: string; startDate: string; endDate: string }) => {
    const fuse = new Fuse(songs, {
      keys: ['artists.name'],
      threshold: 0.3,
    });

    const artistResults = filters.artist ? fuse.search(filters.artist).map(result => result.item) : songs;

    setFilteredSongs(
      songs.filter((song) => {
        const matchMinPopularity = filters.minPopularity === 0 || song.popularity >= filters.minPopularity;
        const matchMaxPopularity = filters.maxPopularity === Infinity || song.popularity <= filters.maxPopularity;
        const matchArtist = filters.artist ? artistResults.includes(song) : true;
        const matchStartDate = filters.startDate ? new Date(song.album.release_date) >= new Date(filters.startDate) : true;
        const matchEndDate = filters.endDate ? new Date(song.album.release_date) <= new Date(filters.endDate) : true;
        return matchMinPopularity && matchMaxPopularity && matchArtist && matchStartDate && matchEndDate;
      })
    );
  };

  const handleResetFilters = () => {
    setFilteredSongs(songs);
  };
  const handleDashboardClick = ()=>{
    navigate('/')
  }
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 text-white flex flex-col p-4">
        {/* <h1 className="text-2xl font-bold mb-6">Sidebar</h1> */}
        <button className="bg-blue-500 text-white p-2 mb-4" onClick={handleDashboardClick}>          
          Dashboard
        </button>
        <button onClick={openFilterModal} className="bg-blue-500 text-white p-2">
          Open Filter
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Spotify Dashboard</h1>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <FilterModal
              isOpen={isFilterOpen}
              onRequestClose={closeFilterModal}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">Chart on Popularity of Song</h2>
                <BarChart data={filteredSongs} />
              </div>
              <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">Number of Tracks by Month</h2>
                <LineChart data={filteredSongs} />
              </div>
            </div>
            <div className="mt-6 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">Songs by Artist</h2>
              <HorBarChart data={filteredSongs} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
