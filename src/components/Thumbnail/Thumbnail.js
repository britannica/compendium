
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolume } from '@fortawesome/pro-solid-svg-icons';
import LazyImage from '../LazyImage/LazyImage';
import Shave from '../Shave/Shave';
import { MediaType } from '../../constants';
import styles from './Thumbnail.scss';


// Render the Thumbnail in a div by default

function DefaultThumbnailComponent({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}


/**
 * Helper function; renders the specific type of thumbnail media
 *
 * @param type
 * @param thumbnailUrl
 * @param altText
 * @param height
 * @param size
 * @param width
 * @param lazyContainer
 * @param hoverCaption
 * @returns {*}
 */

function renderThumbnailType({ type, thumbnailUrl, altText, height, size, width, lazyContainer, hoverCaption }) {
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
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} root={lazyContainer} />
          {hoverCaption && (
            <Shave className={classNames(styles.imageCaption, 'pt-40 p-10 pt-4 p-2')} maxHeightPercentage={0.75}>{altText}</Shave>
          )}
        </div>
      );

    case MediaType.VIDEO:
      return (
        <div className={styles.wrapper}>
          <LazyImage src={thumbnailUrl} alt={altText} height={height} width={width} root={lazyContainer} />
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
  const {
    ThumbnailComponent,
    altText,
    caption,
    mediaId,
    type,
    className,
    height,
    hoverCaption,
    size,
    width,
    onClick,
    opaque,
  } = props;

  return (
    <Fragment>
      <ThumbnailComponent
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
      </ThumbnailComponent>
      {caption && (
        <Shave className={styles.caption} maxHeight={50}>{altText}</Shave>
      )}
    </Fragment>
  );
};

Thumbnail.propTypes = {
  altText: PropTypes.string.isRequired,
  mediaId: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string,
  type: PropTypes.oneOf(Object.values(MediaType)).isRequired,
  title: PropTypes.string.isRequired,

  ThumbnailComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  caption: PropTypes.bool,
  className: PropTypes.string,
  lazyContainer: PropTypes.instanceOf(Element),
  height: PropTypes.number,
  hoverCaption: PropTypes.bool,
  onClick: PropTypes.func,
  opaque: PropTypes.bool,
  size: PropTypes.string,
  width: PropTypes.number,
};

Thumbnail.defaultProps = {
  ThumbnailComponent: DefaultThumbnailComponent,
  caption: false,
  className: '',
  lazyContainer: null,
  height: 75,
  hoverCaption: false,
  onClick: null,
  opaque: false,
  size: 'lg',
  thumbnailUrl: null,
  width: null,
};

export default Thumbnail;
