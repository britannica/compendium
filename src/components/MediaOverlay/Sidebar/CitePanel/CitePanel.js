
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './CitePanel.scss';
import Media from '../../Media/Media';

const CitePanel = ({ media }) => (
  <div className="CitePanel">
    <ul>
      {media.title && (
        <li>
          <strong>Media Title</strong>
          <div dangerouslySetInnerHTML={{ __html: media.title }} />
        </li>
      )}
      <li>
        <strong>Media Type</strong>
        <div dangerouslySetInnerHTML={{ __html: media.type }} />
      </li>
      <li>
        <strong>Website Name</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>Publisher</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>URL</strong>
        <a href={window.location.href}>
          {window.location.href}
        </a>
      </li>
      <li>
        <strong>Access Date</strong>
        {format(new Date(), 'MMMM D, YYYY')}
      </li>
    </ul>
  </div>
);

CitePanel.propTypes = {
  media: PropTypes.shape({
    ...Media.propTypes,
  }).isRequired,
};

export default CitePanel;
