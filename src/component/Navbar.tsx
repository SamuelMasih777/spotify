import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Navbar: React.FC = () => {
  const { toggleTheme, themeMode } = useTheme();

  return (
    <nav className="p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">
          <Link to="/">Spotify Info 2023</Link>
        </h1>
        <div className="flex flex-wrap mt-4 sm:mt-0 space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-2">
            <li>
              <Link
                to="https://samuelmasihsls777.wixsite.com/portfolio"
                target="_blank"
                className="block text-blue-700 rounded"
              >
                By: Samuel Masih
              </Link>
            </li>
          </ul>
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
