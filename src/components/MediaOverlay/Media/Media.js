import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MediaOverlayContext from '../MediaOverlay.context';
import Audio from './Audio/Audio';
import Image from './Image/Image';
import Interactive from './Interactive/Interactive';
import VideoContainer from './Video/VideoContainer';
import './Media.module.scss';

const Media = () => (
  <MediaOverlayContext.Consumer>
    {({
      overlayState: { assembly, previousMediaId },
      overlayProps: { cdn, videoPlayerId },
      hideSidebarAndControls,
      overlayRef,
      showSidebarAndControls,
    }) => (
      <Fragment>
        {assembly.audio && <Audio audioSrc={cdn + assembly.audio.filename} />}
        {assembly.image && <Image {...assembly.image} cdn={cdn} lazyContainer={overlayRef.current} />}
        {assembly.interactive && <Interactive {...assembly.interactive} />}
        {assembly.video && (
          <VideoContainer
            cdn={cdn}
            previousMediaId={previousMediaId}
            assembly={assembly}
            playerId={videoPlayerId}
            onPlay={hideSidebarAndControls}
            onPause={showSidebarAndControls}
            onDisplayClick={hideSidebarAndControls}
          />
        )}
      </Fragment>
    )}
  </MediaOverlayContext.Consumer>
);

Media.propTypes = {
  assemblyId: PropTypes.number,
  expandable: PropTypes.bool,
  title: PropTypes.string,
  caption: PropTypes.string,
};

Media.defaultProps = {
  assemblyId: null,
  expandable: false,
  title: '',
  caption: '',
};

export default Media;
