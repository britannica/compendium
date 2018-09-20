
class MediaService {
  static async fetchMedia(mediaId) {
    return fetch(`/ajax/media-overlay/mediaInfo?id=${mediaId}`).then(response => response.json());
  }

  static async fetchMediaStrip(stripId, type) {
    return fetch(`/ajax/media-overlay/mediaStrip?id=${stripId}&type=${type}&s=300x300`).then(response => response.json());
  }
}

export default MediaService;
