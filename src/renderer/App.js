import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { Tabs, Tab } from 'react-bootstrap';
// import icon from '../../assets/icon.svg';
import MysqlExample from './mysqlExample';
import history from './utils/history';
import ExportJSON from './view/screens/exportJSON';
import ImportJSON from './view/screens/importJSON';
import UpdateFUA from './view/screens/updateFUA';

const Hello = () => {
  return (
    <div>
      <h1> ALGO</h1>
    </div>
  );
};

export default function App() {
  const [key, setKey] = useState('reports');
  const handleActiveTab = (k) => {
    setKey(k);
    history.push(`/${k}`);
  };
  return (
    <div>
      <Tabs
        activeKey={key}
        onSelect={(k) => handleActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="reports" title="REPORTES" />
        <Tab eventKey="profile" title="PENDIENTES DE ENVIO" disabled />
        <Tab eventKey="exportJSON" title="EXPORT DATA" />
        <Tab eventKey="importJSON" title="IMPORT DATA" />
        <Tab eventKey="updateFUA" title="ACTUALIZAR FUA" />
      </Tabs>
      <Router history={history}>
        <Switch>
          <Route exact path="/reports" component={MysqlExample} />
          <Route path="/reports" component={Hello} />
          <Route path="/exportJSON" component={ExportJSON} />
          <Route path="/importJSON" component={ImportJSON} />
          <Route path="/updateFUA" component={UpdateFUA} />
        </Switch>
      </Router>
    </div>
  );
}
