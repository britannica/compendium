import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MediaOverlayContext from '../MediaOverlay.context';
import Audio from './Audio/Audio';
import Image from './Image/Image';
import Interactive from './Interactive/Interactive';
import Video from './Video/Video';
import './Media.module.scss';

const Media = () => (
  <MediaOverlayContext.Consumer>
    {({
      overlayState: { assembly },
      overlayProps: { videoPlayerId, generatePrerollUrl },
      hideSidebarAndControls,
      overlayRef,
      showSidebarAndControls,
    }) => (
      <Fragment>
        {assembly.audio && <Audio filename={assembly.audio.filename} />}
        {assembly.image && <Image {...assembly.image} lazyContainer={overlayRef.current} />}
        {assembly.interactive && <Interactive {...assembly.interactive} />}
        {assembly.video && (
          <Video
            assembly={assembly}
            playerId={videoPlayerId}
            onPlay={hideSidebarAndControls}
            onPause={showSidebarAndControls}
            onDisplayClick={hideSidebarAndControls}
            generatePrerollUrl={generatePrerollUrl}
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
