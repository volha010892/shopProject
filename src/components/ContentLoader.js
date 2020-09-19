import React from 'react';
import ContentLoader from 'react-content-loader';

function MyLoader() {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={491}
      viewBox="0 0 280 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
      <rect x="5" y="5" rx="0" ry="0" width="270" height="249" />
      <rect x="0" y="273" rx="6" ry="6" width="280" height="26" />
      <rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
      <rect x="0" y="418" rx="6" ry="6" width="91" height="31" />
      <rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
    </ContentLoader>
  );
}

export default MyLoader;
