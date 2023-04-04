import { PlayArrow, VolumeUp } from '@material-ui/icons';
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AssemblyProp from '../../prop-types/AssemblyProp';
import LazyImage from '../LazyImage/LazyImage';
import MediaLink from '../MediaOverlay/MediaLink/MediaLink';
import MediaOverlayContext from '../MediaOverlay/MediaOverlay.context';
import Shave from '../Shave/Shave';
import styles from './Thumbnail.module.scss';

// todo: this component is too complex, consider breaking this out into multiple types of thumbnails

/**
 * Thumbnail component
 *
 * @param props
 * @returns {Thumbnail}
 * @constructor
 */

const Thumbnail = memo((props) => {
  const { overlayProps: { basePath } } = useContext(MediaOverlayContext);
  const {
    assembly,
    hasCaption,
    className,
    height,
    hasHoverCaption,
    lazyContainer,
    size,
    onClick,
    isOpaque,
    isSelected,
    width,
  } = props;
  const { audio, image, infogram, interactive, video, caption, title, type } = assembly;

  return (
    <div className={styles.wrapper} style={{ width }}>
      <MediaLink
        assemblyId={assembly.assemblyId}
        basePath={basePath}
        className={classnames(
          styles.Thumbnail,
          styles[className],
          styles[type],
          styles[`size-${size}`],
          { [styles.opaque]: isOpaque },
          { [styles.hoverCaption]: hasHoverCaption },
          { [styles.selected]: isSelected },
        )}
        style={{ height, width }}
        onClick={onClick}
      >
        {audio && (
          <div className={styles.wrapper} style={{ height, width }}>
            <VolumeUp />
            <Shave
              className={classnames(styles.audioTitle, 'mt-5 mt-1')}
              maxHeightPercentage={0.5}
              dangerouslySetInnerHTML={{ __html: caption || title }}
            />
          </div>
        )}
        {image && (
          <div className={styles.wrapper}>
            <LazyImage src={assembly.thumbnailUrl} alt={title} height={height} width={width} root={lazyContainer} />
            {hasHoverCaption && (
              <Shave
                className={classnames(styles.imageCaption, 'pt-40 p-10 pt-4 p-2')}
                maxHeightPercentage={0.75}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
        {infogram && (
          <div className={styles.wrapper}>
            <LazyImage src={assembly.thumbnailUrl} alt={title} height={height} width={width} root={lazyContainer} />
          </div>
        )}
        {interactive && (
          <div className={styles.wrapper}>
            <LazyImage src={assembly.thumbnailUrl} alt={title} height={height} width={width} root={lazyContainer} />
            {hasHoverCaption && (
              <Shave
                className={classnames(styles.imageCaption, 'pt-40 p-10 pt-4 p-2')}
                maxHeightPercentage={0.75}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
        {video && (
          <div className={styles.wrapper}>
            <LazyImage
              src={assembly.thumbnailUrl}
              alt={title}
              height={height}
              width={width}
              root={lazyContainer}
            />
            <PlayArrow />
            {hasHoverCaption && (
              <Shave
                className={classnames(styles.videoCaption, 'p-10 p-2')}
                maxHeightPercentage={0.4}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
      </MediaLink>
      {hasCaption && (
        <div className={classnames(styles.caption, styles.lineClamp)} style={{ width }} dangerouslySetInnerHTML={{ __html: assembly.caption }} />
      )}
    </div>
  );
});

Thumbnail.propTypes = {
  assembly: AssemblyProp.isRequired,
  hasCaption: PropTypes.bool,
  hasHoverCaption: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.number,
  isOpaque: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  lazyContainer: PropTypes.instanceOf(Element),
  size: PropTypes.string,
  width: PropTypes.number,
};

Thumbnail.defaultProps = {
  hasCaption: false,
  hasHoverCaption: false,
  className: '',
  lazyContainer: null,
  height: 75,
  isOpaque: false,
  isSelected: false,
  onClick: null,
  size: 'lg',
  width: null,
};

export default Thumbnail;
