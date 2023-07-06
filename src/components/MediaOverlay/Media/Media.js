import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MediaOverlayContext from '../MediaOverlay.context';
import DefaultAudio from './DefaultAudio/DefaultAudio';
import DefaultImage from './DefaultImage/DefaultImage';
import DefaultInfogram from './DefaultInfogram/DefaultInfogram';
import DefaultInteractive from './DefaultInteractive/DefaultInteractive';
import IFrameVideo from './IFrameVideo/IFrameVideo';
import './Media.module.scss';

const Media = () => {
  const {
    overlayState: { assembly },
    overlayProps: {
      videoPlayerId,
      generatePrerollUrl,
      audioComponent: Audio = DefaultAudio,
      imageComponent: Image = DefaultImage,
      infogramComponent: Infogram = DefaultInfogram,
      interactiveComponent: Interactive = DefaultInteractive,
      videoComponent: Video = IFrameVideo,
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
      {assembly.infogram && <Infogram {...assembly.infogram} title={assembly.title} />}
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
