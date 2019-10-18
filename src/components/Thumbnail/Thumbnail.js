import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolume } from '@fortawesome/pro-solid-svg-icons';
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

const Thumbnail = memo((props) => {
  const {
    ThumbnailComponent,
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
  const { audio, image, interactive, video, caption, title, type } = assembly;

  return (
    <div className={styles.wrapper} style={{ width }}>
      <ThumbnailComponent
        assemblyId={assembly.assemblyId}
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
            <FontAwesomeIcon icon={faVolume} size={size} />
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
            <FontAwesomeIcon icon={faPlay} size={size} />
            {hasHoverCaption && (
              <Shave
                className={classnames(styles.videoCaption, 'p-10 p-2')}
                maxHeightPercentage={0.4}
                dangerouslySetInnerHTML={{ __html: caption || title }}
              />
            )}
          </div>
        )}
      </ThumbnailComponent>
      {hasCaption && (
        <div className={classnames(styles.caption, styles.lineClamp)} style={{ width }} dangerouslySetInnerHTML={{ __html: assembly.caption }} />
      )}
    </div>
  );
});

Thumbnail.propTypes = {
  ThumbnailComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
  ThumbnailComponent: DefaultThumbnailComponent,
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
