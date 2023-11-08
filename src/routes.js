import { Router } from '@vaadin/router';

import './login.js'; // Import the Login component
import './segundo-comp.js'; // Import the Apartado1 component
import './tercer-comp.js';
import './equipos.js'

const routes = [
  {
    path: '/',
    component: 'login-cencoe', // Use the correct component name
  },
  {
    path: '/primer-dashboard',
    component: 'segundo-c', // Use the correct component name
  },
  {
    path: '/segundo-dashboard',
    component: 'tercer-c',
  },
  {
    path: '/primer-dashboard/newUser',
    component: 'modal-to-a-new-user'
  },
  {
    path: '/equipos',
    component: 'team-s'
  },
];

const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes(routes);
