# Vue Profiler

Vue Profiler adds a 'User Timing' timeline to the performance timeline in browser devtools. It uses the [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) and so is supported by most modern browsers.

Note that as this is just a quick plugin build I haven't done thorough testing. Pull requests are welcome.

## Installation

```
npm install vue-profiler
```

## Usage

```
import VueProfiler from 'vue-profiler';
Vue.use(VueProfiler);
```

## To Do

* remove plugin from production builds
* test plugin
