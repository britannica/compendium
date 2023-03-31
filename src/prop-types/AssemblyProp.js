import PropTypes from 'prop-types';
import AudioProp from './AudioProp';
import ImageProp from './ImageProp';
import InfographicProp from './InfographicProp';
import InteractiveProp from './InteractiveProp';
import VideoPlaylistProp from './VideoPlaylistProp';

const AssemblyProp = PropTypes.shape({
  assemblyId: PropTypes.number,
  title: PropTypes.string,
  urlTitle: PropTypes.string,
  caption: PropTypes.string,
  type: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  credit: PropTypes.string,
  audio: AudioProp,
  image: ImageProp,
  infographic: InfographicProp,
  interactive: InteractiveProp,
  video: VideoPlaylistProp,
});

export default AssemblyProp;
