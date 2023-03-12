import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './SearchStore.module.css';

const SearchStore = ({ setSearch }) => {
  return (
    <div className={styles.search__container}>
        <input className={styles.search__input} type="text" placeholder="Search By Product Name" onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
};

export default SearchStore;
