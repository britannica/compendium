import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolume } from '@fortawesome/pro-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { MediaType } from '../../constants';
import AssemblyProp from '../../prop-types/AssemblyProp';
import LazyImage from '../LazyImage/LazyImage';
import Shave from '../Shave/Shave';
import styles from './Thumbnail.module.scss';

// todo: this component is too complex, consider breaking this out into multiple types of thumbnails

// Render the Thumbnail in a div by default

function DefaultThumbnailComponent({ children }) {
  return <div>{children}</div>;
}

/**
 * Thumbnail component
 *
 * @param props
 * @returns {Thumbnail}
 * @constructor
 */

const Thumbnail = memo(props => {
  const {
    ThumbnailComponent,
    assembly,
    hasCaption,
    cdn,
    className,
    height,
    hasHoverCaption,
    lazyContainer,
    match: {
      params: { assemblyId },
    },
    size,
    onClick,
    isOpaque,
    width,
  } = props;
  const { audio, image, interactive, video, caption, title, type } = assembly;
  const cdnThumbnail = `${cdn}/s:300x300`;
  const src =
    type === MediaType.VIDEO
      ? cdnThumbnail + assembly[type].videoPoster.filename
      : cdnThumbnail + assembly[type].filename;

  return (
    <Fragment>
      <ThumbnailComponent
        assemblyId={assembly.assemblyId}
        className={classNames(
          styles.Thumbnail,
          styles[className],
          styles[type],
          styles[`size-${size}`],
          { [styles.opaque]: isOpaque },
          { [styles.hoverCaption]: hasHoverCaption },
          { [styles.selected]: assembly.assemblyId === parseInt(assemblyId) }
        )}
        style={{ height, width }}
        onClick={onClick}
      >
        {audio && (
          <div className={styles.wrapper} style={{ height, width }}>
            <FontAwesomeIcon icon={faVolume} size={size} />
            <Shave
              className={classNames(styles.audioTitle, 'mt-1')}
              maxHeightPercentage={0.5}
              dangerouslySetInnerHTML={{ __html: caption || title }}
            />
          </div>
        )}
        {image && (
          <div className={styles.wrapper}>
            <LazyImage src={src} alt={title} height={height} width={width} root={lazyContainer} />
            {hasHoverCaption && (
              <Shave
                className={classNames(styles.imageCaption, 'pt-4 p-2')}
                maxHeightPercentage={0.75}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
        {interactive && (
          <div className={styles.wrapper}>
            <LazyImage src={src} alt={title} height={height} width={width} root={lazyContainer} />
            {hasHoverCaption && (
              <Shave
                className={classNames(styles.imageCaption, 'pt-4 p-2')}
                maxHeightPercentage={0.75}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
        {video && (
          <div className={styles.wrapper}>
            <LazyImage
              src={cdn + video.videoPoster.filename}
              alt={title}
              height={height}
              width={width}
              root={lazyContainer}
            />
            <FontAwesomeIcon icon={faPlay} size={size} />
            {hasHoverCaption && (
              <Shave
                className={classNames(styles.videoCaption, 'p-2')}
                maxHeightPercentage={0.4}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
      </ThumbnailComponent>
      {hasCaption && (
        <Shave className={styles.caption} maxHeight={50}>
          {assembly.caption}
        </Shave>
      )}
    </Fragment>
  );
});

Thumbnail.propTypes = {
  ThumbnailComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  assembly: AssemblyProp.isRequired,
  hasCaption: PropTypes.bool,
  hasHoverCaption: PropTypes.bool,
  className: PropTypes.string,
  cdn: PropTypes.string.isRequired,
  height: PropTypes.number,
  isOpaque: PropTypes.bool,
  onClick: PropTypes.func,
  lazyContainer: PropTypes.instanceOf(Element),
  size: PropTypes.string,
  width: PropTypes.number,
};

Thumbnail.defaultProps = {
  ThumbnailComponent: DefaultThumbnailComponent,
  hasCaption: false,
  hasHoverCaption: false,
  className: '',
  lazyContainer: null,
  height: 75,
  isOpaque: false,
  onClick: null,
  size: 'lg',
  width: null,
};

export default withRouter(Thumbnail);
