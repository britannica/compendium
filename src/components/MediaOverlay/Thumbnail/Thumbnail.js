
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolume } from '@fortawesome/pro-solid-svg-icons';
import LazyImage from '../../LazyImage/LazyImage';
import Shave from '../../Shave/Shave';
import { MediaType } from '../constants';
import './Thumbnail.scss';
import MediaLink from '../MediaLink/MediaLink';


/**
 * Helper function; renders the specific type of thumbnail media
 *
 * @param type
 * @param thumbnailUrl
 * @param altText
 * @param height
 * @param size
 * @param width
 * @param container
 * @param hoverCaption
 * @returns {*}
 */

function renderThumbnailType({ type, thumbnailUrl, altText, height, size, width, container, hoverCaption }) {
  switch (type) {
    case MediaType.AUDIO:
      return (
        <div className="wrapper" style={{ height, width }}>
          <FontAwesomeIcon icon={faVolume} size={size} />
          <Shave className="Audio--title mt-5" maxHeightPercentage={0.75}>{altText}</Shave>
        </div>
      );

    case MediaType.IMAGE:
    case MediaType.INTERACTIVE:
      return (
        <div className="wrapper">
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} container={container} />
          {hoverCaption && (
            <Shave className="Image--caption pt-40 p-10" maxHeightPercentage={0.75}>{altText}</Shave>
          )}
        </div>
      );

    case MediaType.VIDEO:
      return (
        <div className="wrapper">
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} container={container} />
          <FontAwesomeIcon icon={faPlay} size={size} />
          {hoverCaption && (
            <Shave className="Video--caption p-10" maxHeightPercentage={0.4}>{altText}</Shave>
          )}
        </div>
      );

    default:
      return <div>Unknown media type.</div>;
  }
}


/**
 * Thumbnail component
 *
 * @param props
 * @returns {Thumbnail}
 * @constructor
 */

const Thumbnail = (props) => {
  const { mediaId, type, className, height, hoverCaption, size, width, onClick, opaque } = props;

  return (
    <MediaLink
      mediaId={mediaId}
      className={classNames(
        'Thumbnail',
        className,
        type,
        `size-${size}`,
        { opaque },
        { hoverCaption },
      )}
      style={{ height, width }}
      onClick={onClick}
    >
      {renderThumbnailType(props)}
    </MediaLink>
  );
};

Thumbnail.propTypes = {
  altText: PropTypes.string.isRequired,
  mediaId: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string,
  type: PropTypes.oneOf(Object.values(MediaType)).isRequired,
  title: PropTypes.string.isRequired,

  className: PropTypes.string,
  container: PropTypes.string,
  height: PropTypes.number,
  hoverCaption: PropTypes.bool,
  onClick: PropTypes.func,
  opaque: PropTypes.bool,
  size: PropTypes.string,
  width: PropTypes.number,
};

Thumbnail.defaultProps = {
  className: '',
  container: null,
  height: 75,
  hoverCaption: false,
  onClick: null,
  opaque: false,
  size: 'lg',
  thumbnailUrl: null,
  width: null,
};

export default Thumbnail;
