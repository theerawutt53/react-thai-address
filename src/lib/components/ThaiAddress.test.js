import React from 'react';
import ReactDOM from 'react-dom';
import ThaiAddress from './ThaiAddress';

it('ThaiAddress renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThaiAddress />, div);
});
