import React from 'react';

/* I would move this to a shared components folder */
const Error = ({ error }) => (
  <div className="app-error">{ error }</div>
);

export default Error;