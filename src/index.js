import * as Utils from './utils';

const supportsUserTiming =
  typeof performance !== 'undefined' &&
  typeof performance.mark === 'function' &&
  typeof performance.clearMarks === 'function' &&
  typeof performance.measure === 'function' &&
  typeof performance.clearMeasures === 'function';

const Profiler = {
  install(Vue, options){
    // do nothing if profiling isn't supported
    if ( !supportsUserTiming ) return;

    // add our hooks
    Vue.mixin({
      beforeMount(){
	Utils.profile(this, 'Mounted');
      },
      mounted(){
	Utils.endProfile(this, 'Mounted');
      },
      beforeUpdate(){
	Utils.profile(this, 'Updated');
      },
      updated(){
	Utils.endProfile(this, 'Updated');
      },
      beforeDestroy(){
	Utils.profile(this, 'Destroyed');
      },
      destroyed(){
	Utils.endProfile(this, 'Destroyed');
      }
    });
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Profiler)
}

export default Profiler;
