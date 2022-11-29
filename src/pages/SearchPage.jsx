import React from 'react';
import NavBar from '../component/NavBar';
import SearchField from '../component/SearchField';

function SearchPage() {
  return (
    <div className='searchPage'>
        <NavBar />
        <SearchField />
    </div>
  )
}

export default SearchPage;