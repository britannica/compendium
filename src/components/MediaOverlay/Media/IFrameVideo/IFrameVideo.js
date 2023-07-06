import React from 'react';
import AssemblyProp from '../../../../prop-types/AssemblyProp';

const IFrameVideo = ({ assembly: { assemblyId } }) => (
  <iframe title="jwplayer video" src={`/video/ajax/${assemblyId}`} height="100%" width="100%" scrolling="no" />
);

IFrameVideo.propTypes = {
  assembly: AssemblyProp.isRequired,
};

export default IFrameVideo;
