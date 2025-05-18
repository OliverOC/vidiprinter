import { IEvent } from './IEvent';
import { EventType } from '../enums/EventType';

/**
 * Represents a Half Time event in a football match.
 * Implements the IEvent interface.
 */
export class HalfTimeEvent implements IEvent {
  /**
   * @param competition - The competition name (e.g., 'PL').
   * @param eventType - The event type.
   * @param homeTeam - The home team name.
   * @param awayTeam - The away team name.
   * @param clock - The match clock time.
   * @param homeScore - The home team's score.
   * @param awayScore - The away team's score.
   */
  constructor(
    public competition: string,
    public eventType: EventType = EventType.HT,
    public homeTeam: string,
    public awayTeam: string,
    public clock: string = '45',
    public homeScore: number,
    public awayScore: number,
  ) {}

  /**
   * Returns a string representation of the half time event.
   */
  toString(): string {
    return `${this.competition} HT ${this.homeTeam} ${this.homeScore} ${this.awayTeam} ${this.awayScore}`;
  }
}