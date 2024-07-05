import React, { useState } from 'react';
import Modal from 'react-modal';
import Filter from './filter';

interface FilterModalProps {
  onFilterChange: (filters: { minPopularity: number; maxPopularity: number; artist: string; startDate: string; endDate: string }) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onRequestClose, onFilterChange, onResetFilters }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Filter Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <Filter isOpen={isOpen} onRequestClose={onRequestClose} onFilterChange={onFilterChange} onResetFilters={onResetFilters} />
      </div>
    </Modal>
  );
};

export default FilterModal;
