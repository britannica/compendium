
import React from 'react';
import PropTypes from 'prop-types';
import './CaptionPanel.scss';
import Media from '../../Media/Media';

const CaptionPanel = ({ media: { title, caption, credit, licenseUrl, licenseTitle } }) => (
  <div className="CaptionPanel">
    <div className="CaptionPanel--title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="CaptionPanel--caption" dangerouslySetInnerHTML={{ __html: caption }} />
    <div className="CaptionPanel--credit" dangerouslySetInnerHTML={{ __html: credit }} />
    {licenseUrl && (
      <a href={licenseUrl} className="CaptionPanel--license" dangerouslySetInnerHTML={{ __html: licenseTitle }} />
    )}
  </div>
);

CaptionPanel.propTypes = {
  media: PropTypes.shape(Media.propTypes).isRequired,
};

export default CaptionPanel;
