import { ZoomIn } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import MediaOverlayContext from '../../MediaOverlay.context';

const FullSizeButton = ({ url }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayState: { localeLabels } }) => (
      <a
        data-analytics="MediaOverlay--fullButton"
        href={url}
        className="hidden-xs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ZoomIn style={{ marginRight: 0 }} />
        <span className="d-none d-sm-inline-block">{localeLabels.VIEW_FULL_SIZE}</span>
      </a>
    )}
  </MediaOverlayContext.Consumer>
);

FullSizeButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FullSizeButton;
