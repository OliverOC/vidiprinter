import { Vidiprinter } from '../src/vidiprinter/Vidiprinter';
import { IEvent } from '../src/events/IEvent';

describe('Vidiprinter', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.useFakeTimers();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.useRealTimers();
  });

  it('logs "No events to display." if events array is empty', async () => {
    const vidiprinter = new Vidiprinter([]);
    await vidiprinter.start();
    expect(consoleLogSpy).toHaveBeenCalledWith('No events to display.');
  });

  it('logs each event in order with the correct interval', async () => {
    const event1: IEvent = {
      toString: () => 'PL Goal Arsenal 1 Manchester United 0 Bukayo Saka (12)',
      competition: 'PL',
      eventType: 'Goal',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester United',
      clock: '12'
    };
    const event2: IEvent = {
      toString: () => 'PL Off Harry Maguire (Manchester United) Serious foul play (45+1)',
      competition: 'PL',
      eventType: 'Off',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester United',
      clock: '45+1'
    };
    const vidiprinter = new Vidiprinter([event1, event2], 2);
    const startPromise = vidiprinter.start();
    await Promise.resolve();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('PL Goal Arsenal 1 Manchester United 0 Bukayo Saka (12)');
    jest.advanceTimersByTime(2000);
    await Promise.resolve();
    expect(consoleLogSpy).toHaveBeenCalledWith('PL Off Harry Maguire (Manchester United) Serious foul play (45+1)');
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    await startPromise;
  });

  it('respects the seconds interval between events', async () => {
    const event1: IEvent = {
      toString: () => 'PL Goal Arsenal 1 Manchester United 0 Bukayo Saka (12)',
      competition: 'PL',
      eventType: 'Goal',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester United',
      clock: '12'
    };
    const event2: IEvent = {
      toString: () => 'PL Off Harry Maguire (Manchester United) Serious foul play (45+1)',
      competition: 'PL',
      eventType: 'Off',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester United',
      clock: '45+1'
    };
    const vidiprinter = new Vidiprinter([event1, event2], 3);
    const promise = vidiprinter.start();
    await Promise.resolve();
    expect(consoleLogSpy).toHaveBeenCalledWith('PL Goal Arsenal 1 Manchester United 0 Bukayo Saka (12)');
    jest.advanceTimersByTime(3000);
    await Promise.resolve();
    expect(consoleLogSpy).toHaveBeenCalledWith('PL Off Harry Maguire (Manchester United) Serious foul play (45+1)');
    await promise;
  });
});