import React from 'react';
import ReactDOM from 'react-dom';
import SamplePage from './component'

const root = document.getElementById('sample-page-react-root');
const props = JSON.parse(root.dataset.props);

const component = <SamplePage habitissimoApiBaseUrl={props.habitissimoApiBaseUrl} liveSearchLabelContent={props.liveSearchLabelContent} liveSearchInputPlaceHolder={props.liveSearchInputPlaceHolder} liveSearchOptionChildNameFormat={props.liveSearchOptionChildNameFormat} />;

ReactDOM.render(component, root);