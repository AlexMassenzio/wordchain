import { render, screen, waitFor } from '@testing-library/svelte';
import Timer from './Timer.svelte';

describe('When the timer has been rendered for two seconds', () => {
	it('Should count to around 2 seconds.', async () => {
		render(Timer);
		const displayedTimeElem = screen.getByRole('heading');
		await waitFor(
			() => {
				expect(parseFloat(displayedTimeElem.textContent)).toBeGreaterThanOrEqual(2);
			},
			{ timeout: 2100 }
		);
	});
});
