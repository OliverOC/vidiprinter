import { FullTimeEvent } from '../src/events/FullTimeEvent';
import { EventType } from '../src/enums/EventType';

describe('FullTimeEvent', () => {
  it('should construct and format to string correctly', () => {
    const event = new FullTimeEvent('PL', EventType.FT, 'Man City', 'QPR', '90', 3, 2);
    expect(event.toString()).toBe('PL FT Man City 3 QPR 2');
  });
});