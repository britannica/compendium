
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Media from '../../Media/Media';
import styles from './CitePanel.scss';

const CitePanel = ({ media, localeLabels }) => (
  <div className={styles.CitePanel}>
    <ul>
      {media.title && (
        <li>
          <strong>{localeLabels.CITE_MEDIA_TITLE}</strong>
          <div dangerouslySetInnerHTML={{ __html: media.title }} />
        </li>
      )}
      <li>
        <strong>{localeLabels.CITE_MEDIA_TYPE}</strong>
        <div dangerouslySetInnerHTML={{ __html: media.type }} />
      </li>
      <li>
        <strong>{localeLabels.CITE_WEBSITE_NAME}</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>{localeLabels.CITE_PUBLISHER}</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>{localeLabels.CITE_URL}</strong>
        <a href={window.location.href}>
          {window.location.href}
        </a>
      </li>
      <li>
        <strong>{localeLabels.CITE_ACCESS_DATE}</strong>
        {format(new Date(), 'MMMM d, yyyy')}
      </li>
    </ul>
  </div>
);

CitePanel.propTypes = {
  localeLabels: PropTypes.shape().isRequired,
  media: PropTypes.shape({
    ...Media.propTypes,
  }).isRequired,
};

export default CitePanel;
