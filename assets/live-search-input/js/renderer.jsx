import React from 'react';
import ReactDOM from 'react-dom';
import LiveSearchUiKit from './components/ui-kit';

const root = document.getElementById('live-search-input-container');
const props = JSON.parse(root.dataset.props);

const input = <LiveSearchUiKit habitissimoApiBaseUrl={props.habitissimoApiBaseUrl} inputId={props.inputId} />;

ReactDOM.render(input, root);