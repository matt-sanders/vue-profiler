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

const namedComponent = {
    ...component,
  name: 'Comp'
};

const localVue = createLocalVue();
localVue.use(Profiler);

function expectEntries(names){
  names.forEach(name => {
    expect(performance.getEntriesByName(name).length).not.toBe(0);
  });
}

describe('User Timing', () => {
  it('performance exists', () => {
    expect(performance).not.toBe(undefined);
  });

  describe('Component Names', () => {
    it('has defaults', () => {
      const cp = mount(component, { localVue });
      expectEntries(['Root Mounted']);
    });

    it('takes a name', () => {
      const cp = mount(namedComponent, { localVue });
      expectEntries(['Comp Mounted']);
    });
  });

  describe('Lifecycle Hooks', () => {
    const cp = mount(namedComponent, { localVue });
    
    it('mounted', () => {
      expectEntries(['0_Mounted', '0_MountedEnd', 'Comp Mounted']);
    });

    it('updated', done => {
      cp.setData({ count: 1 });
      setTimeout( () => {
	expectEntries(['0_Updated', '0_UpdatedEnd', 'Comp Updated']);
	done();
      });
    });

    it('destroyed', () => {
      cp.destroy();
      expectEntries(['0_Destroyed', '0_DestroyedEnd', 'Comp Destroyed']);
    });
    
  });
});
