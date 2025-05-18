import { GoalEvent } from '../src/events/GoalEvent';
import { EventType } from '../src/enums/EventType';

describe('GoalEvent', () => {
  it('should construct and format to string correctly', () => {
    const event = new GoalEvent('PL', EventType.Goal, 'Man City', 'QPR', '90+4', 3, 2, 'Aguero');
    expect(event.toString()).toBe('PL Goal Man City 3 QPR 2 Aguero (90+4)');
  });
});