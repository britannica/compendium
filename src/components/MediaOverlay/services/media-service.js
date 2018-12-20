import {MediaType} from "../../../constants";

class MediaService {
  static async fetchMedia(mediaId, videoInfo) {
    return fetch(`/ajax/media-overlay/mediaInfo?id=${mediaId}`)
        .then(function( response ) { return response.json(); } )
        .then(function( json ) {
          let f = () => new Promise(resolve => { resolve( json ); } );
          if ( json.type == MediaType.VIDEO && videoInfo.beforeLoadCallback ) { return videoInfo.beforeLoadCallback().then( f ); }
          else { return f(); }
        });
  }

  static async fetchMediaStrip(stripId, type) {
    return fetch(`/ajax/media-overlay/mediaStrip?id=${stripId}&type=${type}&s=300x300`).then(response => response.json());
  }
}

export default MediaService;
