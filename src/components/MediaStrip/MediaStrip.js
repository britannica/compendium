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
  captions,
  assemblies,
  opaque,
  lazyContainer,
  selectedAssembly,
  ThumbnailComponent,
}) => {
  const [index, setIndex] = useState(0);

  // Set the scrollTo position of the SnapSlider on mount

  useEffect(() => {
    if (selectedAssembly) {
      setIndex(findCurrentMediaIndex(assemblies, selectedAssembly.assemblyId));
    }
  }, []);

  return (
    <div className={classnames(styles.MediaStrip, { [styles.captions]: captions }, 'd-print-none')}>
      <SnapSlider scrollTo={THUMBNAIL_WIDTH * index}>
        {assemblies.map(assembly => (
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
        ))}
      </SnapSlider>
    </div>
  );
};

MediaStrip.propTypes = {
  captions: PropTypes.bool,
  assemblies: PropTypes.arrayOf(AssemblyProp).isRequired,
  lazyContainer: PropTypes.instanceOf(Element),
  opaque: PropTypes.bool,
  selectedAssembly: PropTypes.shape(),
  ThumbnailComponent: PropTypes.func,
};

MediaStrip.defaultProps = {
  captions: false,
  lazyContainer: null,
  opaque: false,
  selectedAssembly: null,
  ThumbnailComponent: () => {},
};

export default MediaStrip;
