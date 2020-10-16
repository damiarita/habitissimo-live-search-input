import React from 'react';
import ReactDOM from 'react-dom';
import SamplePage from './component'

const root = document.getElementById('sample-page-react-root');
const props = JSON.parse(root.dataset.props);

const component = <SamplePage habitissimoApiBaseUrl={props.habitissimoApiBaseUrl} />;

ReactDOM.render(component, root);