import React, { useState } from 'react';
import Modal from 'react-modal';

interface FilterProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onFilterChange: (filters: { minPopularity: number; maxPopularity: number; artist: string; startDate: string; endDate: string }) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ isOpen, onRequestClose, onFilterChange, onResetFilters }) => {
  const [minPopularity, setMinPopularity] = useState<number | ''>('');
  const [maxPopularity, setMaxPopularity] = useState<number | ''>('');
  const [artist, setArtist] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleFilterChange = () => {
    onFilterChange({ 
      minPopularity: minPopularity === '' ? 0 : minPopularity,
      maxPopularity: maxPopularity === '' ? 100 : maxPopularity, 
      artist, 
      startDate, 
      endDate 
    });
    onRequestClose();
  };

  const handleResetFilters = () => {
    setMinPopularity('');
    setMaxPopularity('');
    setArtist('');
    setStartDate('');
    setEndDate('');
    onResetFilters();
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}  // Close the modal when clicking outside
      contentLabel="Filter Modal"
      ariaHideApp={false}  // Add this line if you encounter accessibility issues in development mode
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"  // Overlay style
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Min Popularity</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Min Popularity"
              value={minPopularity}
              onChange={(e) => setMinPopularity(Number(e.target.value) >= 0 ? Number(e.target.value) : '')}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Max Popularity</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Max Popularity"
              value={maxPopularity}
              onChange={(e) => setMaxPopularity(Number(e.target.value) >= 0 ? Number(e.target.value) : '')}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Artist Name</label>
            <input
              type="text"
              placeholder="Artist Name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button onClick={handleFilterChange} className="bg-blue-500 text-white p-2">
              Apply Filters
            </button>
            <button onClick={handleResetFilters} className="bg-gray-500 text-white p-2">
              Reset Filters
            </button>
            <button onClick={onRequestClose} className="bg-red-500 text-white p-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Filter;
