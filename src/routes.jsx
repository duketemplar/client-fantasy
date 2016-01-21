import React from 'react';
import Router from 'react-router';

import ProspectInfoPage from './components/prospect-info-page';
import CompliancePage from './components/compliance-page';
import SignPage from './components/sign-page';

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

const routes = [
  <Route name="customer-info" path="/register/contact-info" handler={ ProspectInfoPage } key="contact-info" />,
  <Route name="compliance" path="/register/regulatory-info" handler={ CompliancePage } key="regulatory-info" />,
  <Route name="sign" path="/register/sign" handler={ SignPage } key="sign-page" />,
  <DefaultRoute handler={ ProspectInfoPage } key="default" />,
  <NotFoundRoute handler={ ProspectInfoPage } key="not-found" />,
];

export default routes;
