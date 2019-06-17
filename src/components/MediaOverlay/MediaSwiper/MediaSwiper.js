import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import AssemblyProp from '../../../prop-types/AssemblyProp';
import LazyImage from '../../LazyImage/LazyImage';
import Taparoo from '../../Taparoo/Taparoo';
import Media from '../Media/Media';
import MediaOverlayContext from '../MediaOverlay.context';
import styles from './MediaSwiper.module.scss';

const MediaSwiper = memo(({ assemblies, selectedIndex, className }) => {
  const { navigateToMedia } = useContext(MediaOverlayContext);
  const swiperRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // After mounting, calculate the size of the container

  useEffect(() => {
    setClientWidth(swiperRef.current.clientWidth);
    setClientHeight(swiperRef.current.clientHeight);
  }, []);

  function onItemsRendered({ visibleStartIndex }) {
    setVisibleIndex(visibleStartIndex);
  }

  return (
    <div className={classnames(styles.MediaSwiper, className)} ref={swiperRef}>
      {!clientWidth && !clientHeight ? (
        <div className="animated fadeIn delay-1s">
          <FontAwesomeIcon icon={faSpinnerThird} size="2x" spin />
        </div>
      ) : (
        <FixedSizeList
          className={styles.swiperTrack}
          height={clientHeight}
          initialScrollOffset={clientWidth * selectedIndex}
          itemCount={assemblies.length}
          itemSize={clientWidth}
          layout="horizontal"
          onItemsRendered={onItemsRendered}
          width={clientWidth}
          useIsScrolling
        >
          {({ index, isScrolling, style }) => {
            const assembly = assemblies[index];

            if (isScrolling === false && index !== selectedIndex && index === visibleIndex) {
              navigateToMedia(assembly.assemblyId);
            }

            return (
              <div className={styles.swiperItem} style={style}>
                <div style={{ minHeight: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/*<h1>{index + 1} ({index} + 1)</h1>*/}
                  {assembly.image && (
                    <img src={assembly.image.filename} alt={assembly.caption} />
                  )}
                  {!assembly.image && (
                    <img src="//placehold.it/500x500" alt="placeholder" />
                  )}
                </div>
              </div>
            );
          }}
        </FixedSizeList>
      )}
    </div>
  );
}, areEqual);

function areEqual(prevProps, nextProps) {
  return prevProps.selectedIndex === nextProps.selectedIndex;
}

MediaSwiper.propTypes = {
  assemblies: PropTypes.arrayOf(AssemblyProp),
  className: PropTypes.string,
  selectedIndex: PropTypes.number,
};

MediaSwiper.defaultProps = {
  assemblies: [],
  className: null,
  selectedIndex: 0,
};

export default MediaSwiper;
