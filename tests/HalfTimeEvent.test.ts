import { HalfTimeEvent } from '../src/events/HalfTimeEvent';
import { EventType } from '../src/enums/EventType';

describe('HalfTimeEvent', () => {
  it('should construct and format to string correctly', () => {
    const event = new HalfTimeEvent('PL', EventType.HT, 'Man City', 'QPR', '45', 1, 1);
    expect(event.toString()).toBe('PL HT Man City 1 QPR 1');
  });
});