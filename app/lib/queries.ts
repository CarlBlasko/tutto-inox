export const galleryQuery = `*[_type == "gallery"][0]{
  images[]{
    _key,
    "url": asset->url,
    "ratio": asset->metadata.dimensions.aspectRatio,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;
