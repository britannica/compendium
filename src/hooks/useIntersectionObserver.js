export default function useIntersectionObserver(intersectionHandler, options) {
  return new IntersectionObserver(entries => entries.forEach(intersectionHandler), options);
}
