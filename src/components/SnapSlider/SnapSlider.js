
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import styles from './SnapSlider.scss';

const SnapSlider = () => (
  <div className={styles.SnapSlider}>
    <button className={classNames(styles.control, styles.prev)}>
      <FontAwesomeIcon icon={faAngleLeft} size="4x" />
    </button>
    <button className={classNames(styles.control, styles.next)}>
      <FontAwesomeIcon icon={faAngleRight} size="4x" />
    </button>
    <div className={styles.slides}>
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
      <img src="https://placehold.it/300x300" alt="blah" />
    </div>
  </div>
);

export default SnapSlider;
