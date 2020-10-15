import React from 'react';
import ReactDOM from 'react-dom';
import LiveSearchInput from './components/live-search-input';

const root = document.getElementById('live-search-input-container');
const props = JSON.parse(root.dataset.props);

const input = <LiveSearchInput habitissimoApiBaseUrl={props.habitissimoApiBaseUrl} />;

ReactDOM.render(input, root);