import Perf from 'performance-node';
import { mount, createLocalVue } from '@vue/test-utils';
import Profiler from './';

window.performance = new Perf();

const component = {
  template: '<div>{{count}}</div>',
  data(){
    return {
      count: 0
    }
  }
};

const localVue = createLocalVue();
localVue.use(Profiler);

describe('User Timing', () => {
  it('performance exists', () => {
    expect(performance).not.toBe(undefined);
  });

  describe('Lifecycle Hooks', () => {
    const cp = mount(component, { localVue });
    
    it('mounted', () => {
      expect(performance.getEntriesByName('0_Mounted').length).not.toBe(0);
      expect(performance.getEntriesByName('0_MountedEnd').length).not.toBe(0);
    });

    it('updated', done => {
      cp.setData({ count: 1 });
      setTimeout( () => {
	expect(performance.getEntriesByName('0_Updated').length).not.toBe(0);
	expect(performance.getEntriesByName('0_UpdatedEnd').length).not.toBe(0);
	done();
      });
    });

    it('destroyed', () => {
      cp.destroy();
      expect(performance.getEntriesByName('0_Destroyed').length).not.toBe(0);
      expect(performance.getEntriesByName('0_DestroyedEnd').length).not.toBe(0);
    });
    
  });
});
