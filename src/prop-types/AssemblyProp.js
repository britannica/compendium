import PropTypes from 'prop-types';
import AudioProp from './AudioProp';
import ImageProp from './ImageProp';
import InfogramProp from './InfogramProp';
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
  infogram: InfogramProp,
  interactive: InteractiveProp,
  video: VideoPlaylistProp,
});

export default AssemblyProp;
