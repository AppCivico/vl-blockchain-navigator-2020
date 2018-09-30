/* global Vue */

import vueGraph from './graph';
import vueResults from './results';
import vueMixin from './vueJsMixin';

Vue.mixin(vueMixin);

window.$vueGraph = new Vue(vueGraph);
window.$vueResults = new Vue(vueResults);
