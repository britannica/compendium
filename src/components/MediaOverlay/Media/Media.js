import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MediaOverlayContext from '../MediaOverlay.context';
import DefaultAudio from './DefaultAudio/DefaultAudio';
import DefaultImage from './DefaultImage/DefaultImage';
import DefaultInteractive from './DefaultInteractive/DefaultInteractive';
import DefaultVideo from './DefaultVideo/DefaultVideo';
import './Media.module.scss';

const Media = () => {
  const {
    overlayState: { assembly },
    overlayProps: {
      videoPlayerId,
      generatePrerollUrl,
      audioComponent: Audio = DefaultAudio,
      imageComponent: Image = DefaultImage,
      interactiveComponent: Interactive = DefaultInteractive,
      videoComponent: Video = DefaultVideo,
    },
    hideSidebarAndControls,
    overlayRef,
    showSidebarAndControls,
  } = useContext(MediaOverlayContext);

  return (
    <>
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
    </>
  );
};

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
