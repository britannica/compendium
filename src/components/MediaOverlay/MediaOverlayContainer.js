// todo: refactor context api using a pattern similar to https://auth0.com/blog/react-context-api-managing-state-with-ease/
// todo: remove PropTypes from production build with https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
// todo: look into more ideal way to show video controls
// todo: only fetch media strip when it's visible

import React, { Component, createRef } from 'react';
import pathToRegexp from 'path-to-regexp';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ViewportWidth } from '../../constants';
import AssemblyProp from '../../prop-types/AssemblyProp';
import { getLocale, Locale } from './l10n';
import { OverlayMode, SidebarPanel } from './overlay-constants';
import {
  findCurrentMediaIndex,
  areControlsToggleable,
} from './helpers/helpers';
import {
  betweenWidths,
  minWidth,
  onMediaQueriesMatch,
  onMinWidth,
  removeMediaQueryListeners,
} from './helpers/responsive-helpers';
import MediaOverlay from './MediaOverlay';
import MediaOverlayContext from './MediaOverlay.context';
import mediaViewerStyles from './MediaViewer/MediaViewer.module.scss';
import styles from './MediaOverlay.module.scss';

class MediaOverlayContainer extends Component {
  overlayRef = createRef();

  // --- Constructor

  constructor(props) {
    super(props);

    this.addEventListeners = this.addEventListeners.bind(this);
    this.enableGalleryView = this.enableGalleryView.bind(this);
    this.enableMediaView = this.enableMediaView.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBreakpoints = this.handleBreakpoints.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.hideSidebarAndControls = this.hideSidebarAndControls.bind(this);
    this.navigateToMedia = this.navigateToMedia.bind(this);
    this.navigateNextMedia = this.navigateNextMedia.bind(this);
    this.navigatePreviousMedia = this.navigatePreviousMedia.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.setSidebarPanel = this.setSidebarPanel.bind(this);
    this.showSidebarAndControls = this.showSidebarAndControls.bind(this);
    this.toPath = this.toPath.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSidebarAndControls = this.toggleSidebarAndControls.bind(this);

    const {
      match: { path, params: { assemblyId } },
      assemblies,
      locale,
      title,
    } = this.props;

    // Determine which media the overlay is opening on

    const mediaIndex = findCurrentMediaIndex(assemblies, assemblyId);

    // State

    this.state = {
      assemblies,
      mediaIndex,
      path,
      activeSidebarPanel: SidebarPanel.CAPTION,
      controlsHidden: false,
      hasError: false,
      isSidebarVisible: true,
      localeLabels: getLocale(locale),
      assembly: assemblies[mediaIndex],
      mode: OverlayMode.MEDIA_VIEW,
      overlayTitle: title,
      previousMediaId: null,
      scrollYPosition: 0,
    };
  }

  // --- Lifecycle methods

  /**
   * Add listeners, do global DOM manipulation, and fetch first media and media strip
   *
   * @returns {Promise}
   */

  componentDidMount() {
    this.addEventListeners();

    document.body.style.overflow = 'hidden';
    document.body.classList.add(styles.open);

    /**
     * Bugfix: EMF-457
     * Lazy loading images using IntersectionObserver with absolute position does't work correctly
     * on Edge 17 and down (Edge 18 works).
     *
     * Solution:
     * Capture the scroll position and save it in the local state of this component as "scrollPosition".
     * Scroll to the top so IntersectionObserver fires and images load.
     * When MediaOverlayContainer unmounts scroll back to the scrollPosition that was saved.
     *
     * todo: Once we stop supporting Edge 17 need to remove this workaround.
     */

    // capture pageYOffset position and scroll to top.

    this.setState({ scrollYPosition: window.pageYOffset }, window.scrollTo(0, 0));

    // Fetch media and media strip

    const {
      match: {
        params: { assemblyId },
      },
    } = this.props;

    this.handleMediaChange(assemblyId);
  }

  /**
   * Fetch a new media whenever the url changes
   *
   * @param prevProps
   * @returns {Promise}
   */

  componentDidUpdate(prevProps) {
    const prevMediaId = prevProps.match.params.assemblyId;
    const {
      match: {
        params: { assemblyId },
      },
    } = this.props;

    if (prevMediaId === assemblyId) {
      return;
    }

    this.handleMediaChange(assemblyId);
  }

  /**
   * Clean up
   */

  componentWillUnmount() {
    this.removeEventListeners();

    document.body.style.overflow = '';
    document.body.classList.remove(styles.open);

    // todo: Once we stop supporting Edge 17  need to remove this workaround.
    const { scrollYPosition } = this.state;

    window.scrollTo(0, scrollYPosition);
  }

  // ---------------------- //
  // --- Custom methods --- //
  // ---------------------- //

  // --- Data fetching

  handleMediaChange(nextMediaId) {
    try {
      const {
        match: {
          params: { assemblyId },
        },
      } = this.props;
      const { assemblies, slidesToShow } = this.state;

      const mediaIndex = findCurrentMediaIndex(assemblies, nextMediaId);

      return this.setState({
        mediaIndex,
        activeSidebarPanel: SidebarPanel.CAPTION,
        assembly: assemblies[mediaIndex],
        previousMediaId: assemblyId,
      });
    }

    catch (error) {
      // Otherwise we have an error

      console.error(error);

      return this.setState({
        hasError: true,
      });
    }
  }

  // --- History updates

  /**
   *
   * @param {number} assemblyId
   * @returns {string}
   */

  toPath(assemblyId) {
    const {
      match: { params },
    } = this.props;
    const { path } = this.state;

    return pathToRegexp.compile(path)({ ...params, assemblyId });
  }

  hideOverlay() {
    const { history, baseHref } = this.props;

    history.push(baseHref);
  }

  navigateToMedia(assemblyId) {
    const { history } = this.props;

    history.push(this.toPath(assemblyId));
  }

  navigateNextMedia() {
    const { mediaIndex, assemblies } = this.state;

    if (mediaIndex === assemblies.length - 1) {
      return;
    }

    this.navigateToMedia(assemblies[mediaIndex + 1].assemblyId);
  }

  navigatePreviousMedia() {
    const { mediaIndex, assemblies } = this.state;

    if (mediaIndex === 0) {
      return;
    }

    this.navigateToMedia(assemblies[mediaIndex - 1].assemblyId);
  }

  // --- Main overlay

  /**
   * Handle state changes when responsive breakpoints are hit
   *
   * @param query
   */

  handleBreakpoints(query) {
  }

  /**
   * Dispatcher for `onkeyup` events
   *
   * @param {KeyboardEvent} event
   */

  handleKeyUp(event) {
    // Using `keyCode` because Edge 16's `key` values are different from other browsers...

    switch (event.keyCode) {
      case 27: // 'Escape'
        this.hideOverlay();
        break;

      case 39: // 'ArrowRight'
        this.navigateNextMedia();
        break;

      case 37: // 'ArrowLeft'
        this.navigatePreviousMedia();
        break;

      default:
    }
  }

  /**
   * Toggle visibility of toolbar, caption, and media controls when tapping media viewer
   * todo: Should this go into MediaViewer? I don't think we use this in any other components
   *
   * @param {TouchEvent} event
   */

  handleTap(event) {
    if (!event.target.closest(`.${mediaViewerStyles.mediaArrow}`)) {
      this.toggleSidebarAndControls();
    }

    console.log(event.target);
  }

  enableGalleryView() {
    this.setState({
      mode: OverlayMode.GALLERY_VIEW,
    });
  }

  enableMediaView() {
    this.setState({
      mode: OverlayMode.MEDIA_VIEW,
    });
  }


  // --- Sidebar

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  }

  toggleSidebarAndControls() {
    if (areControlsToggleable()) {
      this.setState(prevState => ({
        controlsHidden: !prevState.controlsHidden,
        isSidebarVisible: !prevState.isSidebarVisible,
      }));
    }
  }

  hideSidebarAndControls() {
    if (areControlsToggleable()) {
      this.setState({
        controlsHidden: true,
        isSidebarVisible: false,
      });
    }
  }

  showSidebarAndControls(isForced = false) {
    if (areControlsToggleable() || isForced) {
      this.setState({
        controlsHidden: false,
        isSidebarVisible: true,
      });
    }
  }

  /**
   * Set the active sidebar panel
   *
   * @param {string<SidebarPanel>} panel
   */

  setSidebarPanel(panel = SidebarPanel.CAPTION) {
    this.setState({
      activeSidebarPanel: panel,
    });
  }

  // --- Event listeners

  addEventListeners() {
    document.addEventListener('keyup', this.handleKeyUp);

    onMediaQueriesMatch(
      [
        minWidth(ViewportWidth.XXL_MIN),
        betweenWidths(ViewportWidth.XL_MIN, ViewportWidth.XL_MAX),
        betweenWidths(ViewportWidth.LG_MIN, ViewportWidth.LG_MAX),
        betweenWidths(ViewportWidth.MD_MIN, ViewportWidth.MD_MAX),
      ],
      this.handleBreakpoints
    );

    onMinWidth(ViewportWidth.LG_MIN, () => this.showSidebarAndControls(true));
  }

  removeEventListeners() {
    document.removeEventListener('keyup', this.handleKeyUp);

    removeMediaQueryListeners();
  }

  // -------------- //
  // --- Render --- //
  // -------------- //

  render() {
    return (
      <MediaOverlayContext.Provider
        value={{
          overlayState: this.state,
          overlayProps: this.props,
          enableGalleryView: this.enableGalleryView,
          enableMediaView: this.enableMediaView,
          handleKeyUp: this.handleKeyUp,
          handleTap: this.handleTap,
          hideOverlay: this.hideOverlay,
          hideSidebarAndControls: this.hideSidebarAndControls,
          overlayRef: this.overlayRef,
          showSidebarAndControls: this.showSidebarAndControls,
          navigateNextMedia: this.navigateNextMedia,
          navigatePreviousMedia: this.navigatePreviousMedia,
          setSidebarPanel: this.setSidebarPanel,
          toggleSidebar: this.toggleSidebar,
        }}
      >
        <MediaOverlay ref={this.overlayRef} />
      </MediaOverlayContext.Provider>
    );
  }
}

// --- Props

MediaOverlayContainer.propTypes = {
  CustomTools: PropTypes.func,
  EmailPanel: PropTypes.func,
  SidebarTools: PropTypes.func,
  assemblies: PropTypes.arrayOf(AssemblyProp).isRequired,
  baseHref: PropTypes.string,
  collapsibleSidebar: PropTypes.bool,
  generatePrerollUrl: PropTypes.func,
  hasMediaStrip: PropTypes.bool,
  hasAds: PropTypes.bool,
  locale: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  title: PropTypes.string,
  videoPlayerId: PropTypes.string,

  // withRouter props

  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

MediaOverlayContainer.defaultProps = {
  CustomTools: null,
  EmailPanel: null,
  SidebarTools: null,
  baseHref: '/',
  hasMediaStrip: false,
  collapsibleSidebar: false,
  generatePrerollUrl: null,
  hasAds: false,
  locale: Locale['en-us'],
  title: '',
  videoPlayerId: '',
};

export default withRouter(MediaOverlayContainer);
