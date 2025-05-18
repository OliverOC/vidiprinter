import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { IEvent } from '../events/IEvent';
import { SendingOffEvent } from '../events/SendingOffEvent';
import { GoalEvent } from '../events/GoalEvent';
import { HalfTimeEvent } from '../events/HalfTimeEvent';
import { FullTimeEvent } from '../events/FullTimeEvent';
import { EventType } from '../enums/EventType';


/**
 * Parses football event data from JSON lines and constructs event objects.
 */
export class EventParser {
  /**
   * Parses a single line of JSON representing a football event and returns an IEvent instance.
   * @param line - A JSON string representing a football event.
   * @returns An IEvent instance corresponding to the event type.
   * @throws If the JSON is invalid or required fields are missing/invalid.
   */
  parseLine(line: string): IEvent {
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      throw new Error('Invalid JSON: ' + line);
    }
    
    const eventType = obj.event_type;
    const competition = obj.competition;
    const homeTeam = obj.home_team;
    const awayTeam = obj.away_team;
    const homeScore = obj.home_score;
    const awayScore = obj.away_score;
    const player = obj.player;
    const clock = obj.clock;
    const team = obj.team;
    const reason = obj.reason;

    // Vallidation
    if (!eventType || typeof eventType !== 'string') {
      throw new Error(`Missing or invalid event_type: ${eventType}`);
    }
    if (!competition || typeof competition !== 'string') {
      throw new Error(`Missing or invalid competition: ${competition}`);
    }
    if (!homeTeam || typeof homeTeam !== 'string') {
      throw new Error(`Missing or invalid home_team: ${homeTeam}`);
    }
    if (!awayTeam || typeof awayTeam !== 'string') {
      throw new Error(`Missing or invalid away_team: ${awayTeam}`);
    }
    if ([EventType.Goal, EventType.HT, EventType.FT].includes(eventType as EventType)) {
      if (typeof homeScore !== 'number') {
      throw new Error(`Missing or invalid home_score: ${homeScore}`);
      }
      if (typeof awayScore !== 'number') {
      throw new Error(`Missing or invalid away_score: ${awayScore}`);
      }
    }
    if ([EventType.Goal, EventType.Off].includes(eventType as EventType)) {
      if (!player || typeof player !== 'string') {
        throw new Error(`Missing or invalid player: ${player}`);
      }
    }
    if ([EventType.Goal, EventType.Off].includes(eventType as EventType)) {
      if (!clock || (typeof clock !== 'string')) {
        throw new Error(`Missing or invalid clock: ${clock}`);
      }
      const clockRegex = /^(?:[1-9]|[1-8][0-9]|90)(?:\+\d+)?$/;
      if (!clockRegex.test(clock)) {
        throw new Error(`clock must be 1-90 optionally followed by +<number>, got: ${clock}`);
      }
    }

    switch (eventType) {
      case EventType.Goal:
        return new GoalEvent(competition, EventType.Goal, homeTeam, awayTeam, clock, homeScore, awayScore, player);
      case EventType.Off:
        return new SendingOffEvent(competition, EventType.Off, homeTeam, awayTeam, clock, player, team, reason);
      case EventType.HT:
        return new HalfTimeEvent(competition, EventType.HT, homeTeam, awayTeam, clock ?? '45', homeScore, awayScore);
      case EventType.FT:
        return new FullTimeEvent(competition, EventType.FT, homeTeam, awayTeam, clock ?? '90', homeScore, awayScore);
      default:
        throw new Error('Unknown event_type: ' + eventType);
    }
  }

  /**
   * Reads a .jsonl file and parses each line into an IEvent instance.
   * @param path - Path to the .jsonl file containing event data.
   * @returns Promise resolving to an array of IEvent objects.
   */
  async parseJsonl(path: string): Promise<IEvent[]> {
    const events: IEvent[] = [];
    const fileStream = createReadStream(path, { encoding: 'utf8' });
    const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        events.push(this.parseLine(line));
      } catch (err) {
        console.error('Invalid JSON or event:', err, '— skipping line:', line);
      }
    }
    return events;
  }
}
