import { render, screen, waitFor } from '@testing-library/svelte';
import Timer from './Timer.svelte';

describe('When the timer has been rendered for two seconds', () => {
	it('Should count to around 2 seconds.', async () => {
		render(Timer, { elapsed: 0 });
		const displayedTimeElem = screen.getByRole('heading');

		await waitFor(
			() => {
				const timerText =
					displayedTimeElem.textContent == null ? '0' : displayedTimeElem.textContent;
				expect(parseFloat(timerText)).toBeGreaterThanOrEqual(2);
				expect(parseFloat(timerText)).toBeLessThan(3);
			},
			{ timeout: 2100 }
		);
	});

	it('should count down to zero', async () => {
		render(Timer, { elapsed: 60, isCountingDown: true });
		const displayedTimeElem = screen.getByRole('heading');

		await waitFor(
			() => {
				const timerText =
					displayedTimeElem.textContent == null ? '0' : displayedTimeElem.textContent;
				expect(parseFloat(timerText)).toBeLessThanOrEqual(58);
				expect(parseFloat(timerText)).toBeGreaterThan(57);
			},
			{ timeout: 2100 }
		);
	});
});
