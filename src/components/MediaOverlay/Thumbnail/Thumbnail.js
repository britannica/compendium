
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolume } from '@fortawesome/pro-solid-svg-icons';
import LazyImage from '../../LazyImage/LazyImage';
import Shave from '../../Shave/Shave';
import { MediaType } from '../constants';
import MediaLink from '../MediaLink/MediaLink';
import styles from './Thumbnail.scss';


/**
 * Helper function; renders the specific type of thumbnail media
 * todo: remove mendel spacing utility classes after we get mendel on bootstrap's spacing utility system
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
        <div className={styles.wrapper} style={{ height, width }}>
          <FontAwesomeIcon icon={faVolume} size={size} />
          <Shave className={classNames(styles.audioTitle, 'mt-5 mt-1')} maxHeightPercentage={0.75}>{altText}</Shave>
        </div>
      );

    case MediaType.IMAGE:
    case MediaType.INTERACTIVE:
      return (
        <div className={styles.wrapper}>
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} container={container} />
          {hoverCaption && (
            <Shave className={classNames(styles.imageCaption, 'pt-40 p-10 pt-4 p-2')} maxHeightPercentage={0.75}>{altText}</Shave>
          )}
        </div>
      );

    case MediaType.VIDEO:
      return (
        <div className={styles.wrapper}>
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} container={container} />
          <FontAwesomeIcon icon={faPlay} size={size} />
          {hoverCaption && (
            <Shave className={classNames(styles.videoCaption, 'p-10 p-2')} maxHeightPercentage={0.4}>{altText}</Shave>
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
        styles.Thumbnail,
        styles[className],
        styles[type],
        styles[`size-${size}`],
        { [styles.opaque]: opaque },
        { [styles.hoverCaption]: hoverCaption },
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
