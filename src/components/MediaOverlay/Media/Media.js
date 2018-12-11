
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

function renderMediaType(media, videoPlayerId, hideSidebarAndControls, showSidebarAndControls, previousMediaId, lazyContainer) {
  console.log(lazyContainer);
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
      return <Image {...media} lazyContainer={lazyContainer} />;

    default:
      return <FontAwesomeIcon icon={faSpinnerThird} size="2x" spin />;
  }
}

const Media = ({ lazyContainer }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayState: { media, previousMediaId }, overlayProps: { videoPlayerId }, hideSidebarAndControls, showSidebarAndControls }) => (
      renderMediaType(media, videoPlayerId, hideSidebarAndControls, showSidebarAndControls, previousMediaId, lazyContainer)
    )}
  </MediaOverlayContext.Consumer>
);

Media.propTypes = {
  lazyContainer: PropTypes.instanceOf(Element),
};

Media.defaultProps = {
  lazyContainer: null,
};

export default Media;
