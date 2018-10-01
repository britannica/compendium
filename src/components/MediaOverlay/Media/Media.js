
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { MediaType } from '../../../constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Audio from './Audio/Audio';
import Image from './Image/Image';
import Interactive from './Interactive/Interactive';
import VideoContainer from './Video/VideoContainer';
import './Media.scss';

function renderMediaType(media, videoPlayerId, hideSidebarAndControls, showSidebarAndControls, previousMediaId) {
  switch (media.type) {
    case MediaType.INTERACTIVE:
      return <Interactive {...media} />;

    case MediaType.VIDEO:
      return (
        <VideoContainer
          previousMediaId={previousMediaId}
          media={media}
          playerId={videoPlayerId}
          onPlay={hideSidebarAndControls}
          onPause={showSidebarAndControls}
          onDisplayClick={hideSidebarAndControls}
        />
      );

    case MediaType.AUDIO:
      return <Audio audioSrc={media.audioSrc} />;

    case MediaType.IMAGE:
      return <Image {...media} />;

    default:
      return <FontAwesomeIcon icon={faSpinnerThird} size="2x" spin />;
  }
}

const Media = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayState: { media, previousMediaId }, overlayProps: { videoPlayerId }, hideSidebarAndControls, showSidebarAndControls }) => (
      renderMediaType(media, videoPlayerId, hideSidebarAndControls, showSidebarAndControls, previousMediaId)
    )}
  </MediaOverlayContext.Consumer>
);

Media.propTypes = {
  mediaId: PropTypes.number,
  type: PropTypes.oneOf(Object.values(MediaType)),
  expandable: PropTypes.bool,
  title: PropTypes.string,
  caption: PropTypes.string,
  credit: PropTypes.string,
  licenseTitle: PropTypes.string,
  licenseUrl: PropTypes.string,
};

Media.defaultProps = {
  mediaId: null,
  type: null,
  expandable: false,
  title: '',
  caption: '',
  credit: '',
  licenseTitle: '',
  licenseUrl: '',
};

export default Media;
