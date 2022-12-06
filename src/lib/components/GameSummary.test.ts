import { render, screen } from '@testing-library/svelte';
import GameSummary from './GameSummary.svelte';

it('Should display the time taken to complete', () => {
	const totalCompletionTime = 10.521543;
	render(GameSummary, { timeCompleted: totalCompletionTime, wasGameAlreadyPlayed: false });

	const timeSummaryNode = screen.getByRole('heading', { level: 1 });
	const timeFromNode = timeSummaryNode.textContent?.match(/[\d.]+/)?.at(0);

	expect(timeFromNode).toBe('10.52');
});

describe('When the wasGameAlreadyPlayed flag is set to true', () => {
	it('Should not display the time taken to complete', () => {
		const totalCompletionTime = 10.521543;
		render(GameSummary, { timeCompleted: totalCompletionTime, wasGameAlreadyPlayed: true });

		const timeSummaryNode = screen.getByRole('heading', { level: 1 });
		const timeFromNode = timeSummaryNode.textContent?.match(/[\d.]+/)?.at(0);

		expect(timeFromNode).not.toBe('10.52');
	});
});
