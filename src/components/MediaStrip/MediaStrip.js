import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import AssemblyProp from '../../prop-types/AssemblyProp';
import SnapSlider from '../SnapSlider/SnapSlider';
import Thumbnail from '../Thumbnail/Thumbnail';
import styles from './MediaStrip.module.scss';

// todo: add list virtualization; react-window

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
  const index = selectedAssembly ? assemblies.findIndex(assembly => assembly.assemblyId === selectedAssembly.assemblyId) : 0;

  return (
    <div className={classNames(styles.MediaStrip, { [styles.captions]: captions }, 'd-print-none')}>
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
