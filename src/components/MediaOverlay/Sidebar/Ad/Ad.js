import PropTypes from 'prop-types';
import React from 'react';
import styles from './Ad.module.scss';

const Ad = ({ assemblyId }) => (
  <div className={styles.Ad} id="media-overlay-ad" data-assembly-id={assemblyId} />
);

Ad.propTypes = {
  assemblyId: PropTypes.number.isRequired,
};

export default Ad;
