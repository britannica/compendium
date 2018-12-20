# MediaOverlay

```js
MediaOverlay.propTypes = {
  // Tools that show up in the Toolbar, this component will have the overlay's state passed as props
  CustomTools: PropTypes.func,
  
  // If included, will show up as a new "Email" tab next to the Cite tab. This is self-contained and should include all form logic, validation, error handling, etc
  EmailPanel: PropTypes.func,
  
  // Tools that show up under the content in the Sidebar, this component will have the overlay's state passed as props
  SidebarTools: PropTypes.func,
  
  // The location to navigate to when closing the overlay. Defaults to '/'
  baseHref: PropTypes.string,
  
  hasMediaStrip: PropTypes.bool,
  collapsibleSidebar: PropTypes.bool,
  hasAds: PropTypes.bool,
  
  // An object with all the labels, or a string specifying the language and region. Accepts: 'en-us', 'pt-br'
  locale: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  
  // Type of media strip to fetch. Accepts: 'topic', 'gallery'
  type: PropTypes.string,
  
  // Video ad info
  videoInfo: PropTypes.object,
}
```
