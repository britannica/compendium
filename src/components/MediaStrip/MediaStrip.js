import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AssemblyProp from '../../prop-types/AssemblyProp';
import { findCurrentMediaIndex } from '../MediaOverlay/helpers/helpers';
import SnapSlider from '../SnapSlider/SnapSlider';
import Thumbnail from '../Thumbnail/Thumbnail';
import styles from './MediaStrip.module.scss';

// todo: consider list virtualization, possibly react-window

const THUMBNAIL_WIDTH = 110;
const THUMBNAIL_HEIGHT = 75;

const MediaStrip = ({
  className,
  captions,
  assemblies,
  opaque,
  lazyContainer,
  selectedAssembly,
  ThumbnailComponent,
}) => {
  const [initialIndex, setInitialIndex] = useState(selectedAssembly ? findCurrentMediaIndex(assemblies, selectedAssembly.assemblyId) : 0);

  return (
    <div className={classnames(styles.MediaStrip, { [styles.captions]: captions }, 'd-print-none', className)}>
      <SnapSlider
        scrollTo={THUMBNAIL_WIDTH * initialIndex}
        /*initialIndex={initialIndex}
        selectedIndex={findCurrentMediaIndex(assemblies, selectedAssembly.assemblyId)}
        thumbnailWidth={THUMBNAIL_WIDTH}*/
      >
        {/* todo: can we replace the track with react-window? animated example https://codesandbox.io/s/k2lpl9m0l3 */}
        {({ trackWidth, scrollAmount }) => {
          console.log(trackWidth, scrollAmount);

          return (
            assemblies.map(assembly => (
              <Thumbnail
                assembly={assembly}
                key={assembly.assemblyId}
                hasCaption={captions}
                container={styles.MediaStrip}
                height={THUMBNAIL_HEIGHT}
                lazyContainer={lazyContainer}
                isOpaque={opaque}
                isSelected={selectedAssembly?.assemblyId === assembly.assemblyId}
                width={THUMBNAIL_WIDTH}
                ThumbnailComponent={ThumbnailComponent}
              />
            ))
          );
        }}
      </SnapSlider>
    </div>
  );
};

MediaStrip.propTypes = {
  className: PropTypes.string,
  captions: PropTypes.bool,
  assemblies: PropTypes.arrayOf(AssemblyProp).isRequired,
  lazyContainer: PropTypes.instanceOf(Element),
  opaque: PropTypes.bool,
  selectedAssembly: PropTypes.shape(),
  ThumbnailComponent: PropTypes.func,
};

MediaStrip.defaultProps = {
  className: null,
  captions: false,
  lazyContainer: null,
  opaque: false,
  selectedAssembly: null,
  ThumbnailComponent: () => {},
};

export default MediaStrip;
