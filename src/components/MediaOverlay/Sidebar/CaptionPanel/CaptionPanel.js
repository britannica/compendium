
import React from 'react';
import PropTypes from 'prop-types';
import Media from '../../Media/Media';
import styles from './CaptionPanel.scss';

const CaptionPanel = ({ media: { title, caption, credit, licenseUrl, licenseTitle } }) => (
  <div className={styles.CaptionPanel}>
    <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
    <div className={styles.caption} dangerouslySetInnerHTML={{ __html: caption }} />
    <div className={styles.credit} dangerouslySetInnerHTML={{ __html: credit }} />
    {licenseUrl && (
      <a href={licenseUrl} className={styles.license} dangerouslySetInnerHTML={{ __html: licenseTitle }} />
    )}
  </div>
);

CaptionPanel.propTypes = {
  media: PropTypes.shape(Media.propTypes).isRequired,
};

export default CaptionPanel;
