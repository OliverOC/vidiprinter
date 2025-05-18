import { EventParser } from '../src/parser/EventParser';
import { EventType } from '../src/enums/EventType';

describe('EventParser', () => {
  const parser = new EventParser();

  it('parses a valid Goal event line', () => {
    const line = JSON.stringify({
      event_type: 'Goal',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 3,
      away_score: 2,
      player: 'Aguero',
      clock: '90+4'
    });
    const event = parser.parseLine(line);
    expect(event.eventType).toBe(EventType.Goal);
    expect(event.toString()).toBe('PL Goal Man City 3 QPR 2 Aguero (90+4)');
  });

  it('throws on missing event_type', () => {
    const line = JSON.stringify({ competition: 'PL', home_team: 'A', away_team: 'B' });
    expect(() => parser.parseLine(line)).toThrow(/event_type/);
  });

  it('throws on invalid JSON', () => {
    expect(() => parser.parseLine('{invalid json')).toThrow(/Invalid JSON/);
  });

  it('throws on missing player for Goal event', () => {
    const line = JSON.stringify({
      event_type: 'Goal',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 1,
      away_score: 0,
      clock: '12'
    });
    expect(() => parser.parseLine(line)).toThrow(/player/);
  });

  it('throws on malformed clock for Goal event', () => {
    const line = JSON.stringify({
      event_type: 'Goal',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 1,
      away_score: 0,
      player: 'Aguero',
      clock: 'abc'
    });
    expect(() => parser.parseLine(line)).toThrow(/clock/);
  });

  it('parses injury time edge case (45+1)', () => {
    const line = JSON.stringify({
      event_type: 'Goal',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 2,
      away_score: 2,
      player: 'Aguero',
      clock: '45+1'
    });
    const event = parser.parseLine(line);
    expect(event.toString()).toBe('PL Goal Man City 2 QPR 2 Aguero (45+1)');
  });

  it('parses injury time edge case (90+10)', () => {
    const line = JSON.stringify({
      event_type: 'Goal',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 3,
      away_score: 2,
      player: 'Aguero',
      clock: '90+10'
    });
    const event = parser.parseLine(line);
    expect(event.toString()).toBe('PL Goal Man City 3 QPR 2 Aguero (90+10)');
  });

  it('parses a valid Sending Off event', () => {
    const line = JSON.stringify({
      event_type: 'Off',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      player: 'Kompany',
      clock: '12',
      team: 'Home',
      reason: 'Professional foul'
    });
    const event = parser.parseLine(line);
    expect(event.eventType).toBe(EventType.Off);
    expect(event.toString()).toBe('PL Off Kompany (Man City) Professional foul (12)');
  });

  it('parses a valid Half Time event', () => {
    const line = JSON.stringify({
      event_type: 'HT',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 1,
      away_score: 1
    });
    const event = parser.parseLine(line);
    expect(event.eventType).toBe(EventType.HT);
    expect(event.toString()).toBe('PL HT Man City 1 QPR 1');
  });

  it('parses a valid Full Time event', () => {
    const line = JSON.stringify({
      event_type: 'FT',
      competition: 'PL',
      home_team: 'Man City',
      away_team: 'QPR',
      home_score: 3,
      away_score: 2
    });
    const event = parser.parseLine(line);
    expect(event.eventType).toBe(EventType.FT);
    expect(event.toString()).toBe('PL FT Man City 3 QPR 2');
  });
});