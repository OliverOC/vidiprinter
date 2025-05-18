import { IEvent } from './IEvent';
import { EventType } from '../enums/EventType';

/**
 * Represents a Full Time event in a football match.
 * Implements the IEvent interface.
 */
export class FullTimeEvent implements IEvent {
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
    public eventType: EventType = EventType.FT,
    public homeTeam: string,
    public awayTeam: string,
    public clock: string = '90',
    public homeScore: number,
    public awayScore: number,
  ) {}

  /**
   * Returns a string representation of the full time event.
   */
  toString(): string {
    return `${this.competition} FT ${this.homeTeam} ${this.homeScore} ${this.awayTeam} ${this.awayScore}`;
  }
}