import { IEvent } from './IEvent';
import { EventType } from '../enums/EventType';
import { Team } from '../enums/Team';

/**
 * Represents a Sending Off (red card) event in a football match.
 * Implements the IEvent interface.
 */
export class SendingOffEvent implements IEvent {
  /**
   * @param competition - The competition name (e.g., 'PL').
   * @param eventType - The event type.
   * @param homeTeam - The home team name.
   * @param awayTeam - The away team name.
   * @param clock - The match clock time.
   * @param player - The player who was sent off.
   * @param team - The team of the player sent off.
   * @param reason - The reason for the sending off.
   */
  constructor(
    public competition: string,
    public eventType: EventType = EventType.Off,
    public homeTeam: string,
    public awayTeam: string,
    public clock: string,
    public player: string,
    public team: Team,
    public reason: string,
  ) {}

  /**
   * Returns a string representation of the sending off event.
   */
  toString(): string {
    const teamOfSendingOff = this.team === Team.Home ? this.homeTeam : this.team === Team.Away ? this.awayTeam : this.team;
    return `${this.competition} Off ${this.player} (${teamOfSendingOff})${this.reason ? ` ${this.reason}` : ''} (${this.clock})`;
  }
}