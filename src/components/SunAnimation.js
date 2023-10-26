import React from 'react';

const SunAnimation = ({  rotation }) => {

 
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="729" height="588" viewBox="0 0 729 588" fill="none">
      <g transform="translate(${rotation})">
        <!-- Add the light beam path here -->
        <path
          id="light"
          d="M0 0C8.75641 8.75641 8.75641 22.9535 0 31.71C-8.75641 40.4665 -22.9535 40.4665 -31.71 31.71C-40.4665 22.9535 -40.4665 8.75641 -31.71 0C-22.9535 -8.75641 -8.75641 -8.75641 0 0Z"
          transform="translate(164 16)"  <!-- Translate the light point to the center of the circle -->
          fill="url(#paint0_linear)"
        />

        <g mask="url(#mask0)">
          <g id="yellow" class="rotate">
            <path
              d="M162.448 16.7652C171.223 25.5024 171.255 39.6994 162.518 48.4751C153.78 57.2509 139.583 57.2821 130.808 48.5449C122.032 39.8078 122.001 25.6107 130.738 16.835C139.475 8.05924 153.672 8.028 162.448 16.7652Z"
              fill="#F4C600"
            />
            <path
              d="M162.448 16.7652C171.223 25.5024 171.255 39.6994 162.518 48.4751C153.78 57.2509 139.583 57.2821 130.808 48.5449L494.478 775.765L914.245 774.713L162.448 16.7652Z"
              fill="#F4C600"
            />
          </g>
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear" x1="159.5" y1="47.5" x2="143" y2="17" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F4C600" />
          <stop offset="1" stop-color="#F4C600" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
`;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
};

export default SunAnimation;
