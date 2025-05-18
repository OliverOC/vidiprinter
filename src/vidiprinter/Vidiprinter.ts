import { IEvent } from '../events/IEvent';

/**
 * Vidiprinter prints football events to the console at a configurable interval.
 */
export class Vidiprinter {
  private events: IEvent[];
  private seconds: number;

  /**
   * @param events - Array of IEvent objects to print.
   * @param seconds - Interval in seconds between each event (default: 5).
   */
  constructor(events: IEvent[], seconds: number = 5) {
    this.events = events;
    this.seconds = seconds;
  }

  /**
   * Starts printing events to the console at the configured interval.
   * If no events are present, logs a message and returns.
   */
  async start() {
    if (this.events.length === 0) {
      console.log('No events to display.');
      return;
    }
    for (let i = 0; i < this.events.length; i++) {
      if (i > 0) {
        await this.sleep(this.seconds);
      }
      console.log(this.events[i].toString());
    }
  }

  /**
   * Helper function to pause execution for a given number of milliseconds.
   * @param seconds - Seconds to sleep.
   * @returns Promise that resolves after the specified time.
   */
  private sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
}
