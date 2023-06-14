import { useState, useEffect, useRef } from 'react';

const useResponsiveChart = () => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setDimensions(entry.contentRect);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current]);

  return [ref, dimensions];
};

const withResponsiveness = WrappedComponent => ({ ...props }) => {
  const [ref, dimensions] = useResponsiveChart();

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {dimensions.width && dimensions.height ? (
        <WrappedComponent width={dimensions.width} height={dimensions.height} {...props} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default withResponsiveness;