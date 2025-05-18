import { IEvent } from './IEvent';
import { EventType } from '../enums/EventType';

/**
 * Represents a Goal event in a football match.
 * Implements the IEvent interface.
 */
export class GoalEvent implements IEvent {
  /**
   * @param competition - The competition name (e.g., 'PL').
   * @param eventType - The event type.
   * @param homeTeam - The home team name.
   * @param awayTeam - The away team name.
   * @param clock - The match clock time.
   * @param homeScore - The home team's score.
   * @param awayScore - The away team's score.
   * @param player - The player who scored the goal.
   */
  constructor(
    public competition: string,
    public eventType: EventType = EventType.Goal,
    public homeTeam: string,
    public awayTeam: string,
    public clock: string,
    public homeScore: number,
    public awayScore: number,
    public player: string,
  ) {}

  /**
   * Returns a string representation of the goal event.
   */
  toString(): string {
    return `${this.competition} Goal ${this.homeTeam} ${this.homeScore} ${this.awayTeam} ${this.awayScore} ${this.player} (${this.clock})`;
  }
}