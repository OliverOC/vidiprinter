import { SendingOffEvent } from '../src/events/SendingOffEvent';
import { EventType } from '../src/enums/EventType';
import { Team } from '../src/enums/Team';

describe('SendingOffEvent', () => {
  it('should construct and format to string correctly (home team)', () => {
    const event = new SendingOffEvent('PL', EventType.Off, 'Man City', 'QPR', '12', 'Kompany', Team.Home, 'Professional foul');
    expect(event.toString()).toBe('PL Off Kompany (Man City) Professional foul (12)');
  });
  it('should construct and format to string correctly (away team)', () => {
    const event = new SendingOffEvent('PL', EventType.Off, 'Man City', 'QPR', '46', 'Gerrard', Team.Away, 'Serious foul play');
    expect(event.toString()).toBe('PL Off Gerrard (QPR) Serious foul play (46)');
  });
});