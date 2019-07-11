import { useEffect, useRef, useState } from 'react';

let observer;

export default function useIntersectionObserver({ root = null, rootMargin, threshold = 0 }) {
  //const observer = useRef();
  const [element, observeElement] = useState(null);
  const [entry, setEntry] = useState({});

  if (!observer) {
    console.log('create intersection observer');

    observer = new IntersectionObserver((entries) => {
      console.log('entry');
      entries.forEach(currentEntry => setEntry(currentEntry));
    }, {
      root,
      rootMargin,
      threshold,
    });
  }

  useEffect(() => {
    if (element) {
      console.log('observe');
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element]);

  return {
    entry,
    observeElement,
  };
}
