
// todo: refactor context api using a pattern similar to https://auth0.com/blog/react-context-api-managing-state-with-ease/
// todo: remove PropTypes from production build with https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
// todo: look into more ideal way to show video controls
// todo: only fetch media strip when it's visible

import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ViewportWidth } from '../../constants';
import { getLocale, Locale } from './l10n';
import { OverlayMode, OverlayType, SidebarPanel } from './overlay-constants';
import {
  findCurrentMediaIndex,
  getCarouselIndex,
  determineSlidesToShow,
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
import MediaService from './services/media-service';
import mediaViewerStyles from './MediaViewer/MediaViewer.scss';

console.log('255')

class MediaOverlayContainer extends Component {
  static Type = OverlayType;


  // --- Constructor

  constructor(props) {
    super(props);

    this.addEventListeners = this.addEventListeners.bind(this);
    this.enableGalleryView = this.enableGalleryView.bind(this);
    this.enableMediaView = this.enableMediaView.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleCarouselPagination = this.handleCarouselPagination.bind(this);
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

    const { match: { path }, locale } = this.props;

    // State

    this.state = {
      path,
      activeSidebarPanel: SidebarPanel.CAPTION,
      carouselPageIndex: 0,
      controlsHidden: false,
      hasError: false,
      isSidebarVisible: true,
      localeLabels: getLocale(locale),
      media: {},
      mediaIndex: 0,
      mediaStrip: [],
      mode: OverlayMode.MEDIA_VIEW,
      overlayTitle: '',
      previousMediaId: null,
      slidesToShow: determineSlidesToShow(),
    };
  }


  // --- Lifecycle methods

  /**
   * Add listeners, do global DOM manipulation, and fetch first media and media strip
   *
   * @returns {Promise}
   */

  async componentDidMount() {
    this.addEventListeners();

    document.body.style.overflow = 'hidden';


    // Fetch media and media strip

    const { match: { params: { mediaId } } } = this.props;

    await this.handleMediaChange(mediaId);
  }


  /**
   * Fetch a new media whenever the url changes
   *
   * @param prevProps
   * @returns {Promise}
   */

  async componentDidUpdate(prevProps) {
    const prevMediaId = prevProps.match.params.mediaId;
    const { match: { params: { mediaId } } } = this.props;

    if (prevMediaId === mediaId) {
      return;
    }

    await this.handleMediaChange(mediaId);
  }


  /**
   * Clean up
   */

  componentWillUnmount() {
    this.removeEventListeners();

    document.body.style.overflow = '';
  }


  // ---------------------- //
  // --- Custom methods --- //
  // ---------------------- //

  // --- Data fetching

  async handleMediaChange(nextMediaId) {
    try {
      const { type, history, match: { params: { mediaId, stripId } } } = this.props;
      const { slidesToShow } = this.state;
      let { mediaStrip, overlayTitle } = this.state;

      // Fetch the media strip if it hasn't been already

      if (mediaStrip.length === 0) {
        const { thumbnails, title } = await MediaService.fetchMediaStrip(stripId, type);

        mediaStrip = thumbnails;
        overlayTitle = title;
      }

      // If we're coming in on a route without a media id, redirect to a route that has a media id

      if (!nextMediaId) {
        nextMediaId = mediaStrip[0].mediaId;

        history.replace(this.toPath(nextMediaId));
      }

      const mediaIndex = findCurrentMediaIndex(mediaStrip, nextMediaId);

      return this.setState({
        mediaIndex,
        mediaStrip,
        overlayTitle,
        carouselPageIndex: getCarouselIndex(mediaIndex, slidesToShow),
        media: await MediaService.fetchMedia(nextMediaId),
        previousMediaId: mediaId,
      });
    }


    // Otherwise we have an error

    catch (error) {
      console.error(error);

      return this.setState({
        hasError: true,
      });
    }
  }


  // --- History updates

  /**
   *
   * @param {number} mediaId
   * @returns {string}
   */

  toPath(mediaId) {
    const { match: { params } } = this.props;
    const { path } = this.state;

    return pathToRegexp.compile(path)({ ...params, mediaId });
  }

  hideOverlay() {
    const { history, baseHref } = this.props;

    history.push(baseHref);
  }

  navigateToMedia(mediaId) {
    const { history } = this.props;

    history.push(this.toPath(mediaId));
  }

  navigateNextMedia() {
    const { mediaIndex, mediaStrip } = this.state;

    if (mediaIndex === mediaStrip.length - 1) {
      return;
    }

    this.navigateToMedia(mediaStrip[mediaIndex + 1].mediaId);
  }


  navigatePreviousMedia() {
    const { mediaIndex, mediaStrip } = this.state;

    if (mediaIndex === 0) {
      return;
    }

    this.navigateToMedia(mediaStrip[mediaIndex - 1].mediaId);
  }


  // --- Main overlay

  /**
   * Handle state changes when responsive breakpoints are hit
   *
   * @param query
   */

  handleBreakpoints(query) {
    this.setState({
      slidesToShow: determineSlidesToShow(),
    });
  }


  /**
   * Dispatcher for `onkeyup` events
   *
   * @param {KeyboardEvent} event
   */

  handleKeyUp(event) {
    switch (event.key) {
      case 'Escape':
        this.hideOverlay();
        break;

      case 'ArrowRight':
        this.navigateNextMedia();
        break;

      case 'ArrowLeft':
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


  // --- Media Strip

  /**
   * Set the carousel "page" after moving to a new slide
   *
   * @param index
   */

  handleCarouselPagination(index) {
    this.setState({
      carouselPageIndex: index,
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

    onMediaQueriesMatch([
      minWidth(ViewportWidth.XL_MIN),
      betweenWidths(ViewportWidth.LG_MIN, ViewportWidth.LG_MAX),
      betweenWidths(ViewportWidth.MD_MIN, ViewportWidth.MD_MAX),
    ], this.handleBreakpoints);

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
          handleCarouselPagination: this.handleCarouselPagination,
          handleKeyUp: this.handleKeyUp,
          handleTap: this.handleTap,
          hideOverlay: this.hideOverlay,
          hideSidebarAndControls: this.hideSidebarAndControls,
          showSidebarAndControls: this.showSidebarAndControls,
          navigateNextMedia: this.navigateNextMedia,
          navigatePreviousMedia: this.navigatePreviousMedia,
          setSidebarPanel: this.setSidebarPanel,
          toggleSidebar: this.toggleSidebar,
        }}
      >
        <MediaOverlay />
      </MediaOverlayContext.Provider>
    );
  }
}


// --- Props

MediaOverlayContainer.propTypes = {
  baseHref: PropTypes.string,
  hasMediaStrip: PropTypes.bool,
  collapsibleSidebar: PropTypes.bool,
  CustomTools: PropTypes.func,
  EmailPanel: PropTypes.func,
  hasAds: PropTypes.bool,
  locale: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  SidebarTools: PropTypes.func,
  type: PropTypes.string,
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
  hasAds: false,
  locale: Locale['en-us'],
  type: OverlayType.TOPIC,
  videoPlayerId: '',
};

export default withRouter(MediaOverlayContainer);
