import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <>
      <div>About</div>
      <li className="navItem">
        <Link to="/seller/addProduct" className="navLink">AddProduct</Link>
      </li>
    </>
  )
};

export default About;