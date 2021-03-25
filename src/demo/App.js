import React from 'react';
import ThaiAddress from '../lib';

const App = () => (
  <div>
    {JSON.stringify(ThaiAddress.search({province:"พิษณุโลก"}, 10))}
  </div>
);

export default App;
