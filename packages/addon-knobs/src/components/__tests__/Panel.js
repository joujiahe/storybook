import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../Panel';

describe('Panel', () => {
  it('should subscribe to setKnobs event of channel', () => {
    const testChannel = { on: jest.fn() };
    shallow(<Panel channel={testChannel} />);
    expect(testChannel.on).toHaveBeenCalledWith('addon:knobs:setKnobs');
  });

  describe('setKnobs handler', () => {
    it('should read url params and set values for existing knobs', () => {
      const handlers = {};

      const testChannel = {
        on: (e, handler) => {
          handlers[e] = handler;
        },
        emit: jest.fn(),
      };

      const testQueryParams = {
        'knob-foo': 'test string',
        bar: 'some other string',
      };

      const testApi = {
        getQueryParam: key => testQueryParams[key],
        setQueryParams: jest.fn(),
      };

      shallow(<Panel channel={testChannel} api={testApi} />);
      const setKnobsHandler = handlers['addon:knobs:setKnobs'];

      const knobs = {
        foo: {
          name: 'foo',
          value: 'default string',
          type: 'text',
        },
        baz: {
          name: 'baz',
          value: 'another knob value',
          type: 'text',
        },
      };

      setKnobsHandler(knobs);
      const knobFromUrl = {
        name: 'foo',
        value: testQueryParams['knob-foo'],
        type: 'text',
      };
      const e = 'addon:knobs:knobChange';
      expect(testChannel.emit).toHaveBeenCalledWith(e, knobFromUrl);
    });

    it('should set query params when url params are already read', () => {
      const handlers = {};

      const testChannel = {
        on: (e, handler) => {
          handlers[e] = handler;
        },
        emit: jest.fn(),
      };

      const testQueryParams = {
        'knob-foo': 'test string',
        bar: 'some other string',
      };

      const testApi = {
        getQueryParam: key => testQueryParams[key],
        setQueryParams: jest.fn(),
      };

      const wrapper = shallow(<Panel channel={testChannel} api={testApi} />);
      const setKnobsHandler = handlers['addon:knobs:setKnobs'];

      const knobs = {
        foo: {
          name: 'foo',
          value: 'default string',
          type: 'text',
        },
        baz: {
          name: 'baz',
          value: 'another knob value',
          type: 'text',
        },
      };

      // Make it act like that url params are already checked
      wrapper.instance().loadedFromUrl = true;

      setKnobsHandler(knobs);
      const knobFromStory = {
        'knob-foo': knobs.foo.value,
        'knob-baz': knobs.baz.value,
      };

      expect(testApi.setQueryParams).toHaveBeenCalledWith(knobFromStory);
    });
  });

  describe('handleChange()', () => {
    it('should set queryParams and emit knobChange event', () => {
      const testChannel = {
        on: jest.fn(),
        emit: jest.fn(),
      };

      const testApi = {
        getQueryParam: jest.fn(),
        setQueryParams: jest.fn(),
      };

      const wrapper = shallow(<Panel channel={testChannel} api={testApi} />);

      const testChangedKnob = {
        name: 'foo',
        value: 'changed text',
        type: 'text',
      };
      wrapper.instance().handleChange(testChangedKnob);
      expect(testChannel.emit.calledWith('addon:knobs:knobChange', testChangedKnob)).to.equal(true);

      const paramsChange = { 'knob-foo': 'changed text' };
      expect(testApi.setQueryParams).toHaveBeenCalledWith(paramsChange);
    });
  });
});
