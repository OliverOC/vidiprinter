/**
 * Interface for all football event types.
 */
export interface IEvent {
  toString(): string;
  competition: string;
  eventType: string;
  homeTeam: string;
  awayTeam: string;
  clock?: string;
}
