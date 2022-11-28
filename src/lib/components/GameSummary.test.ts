import { render, screen } from '@testing-library/svelte';
import GameSummary from './GameSummary.svelte';

it('Should display the time taken to complete', () => {
	const totalCompletionTime = 10.521543;
	render(GameSummary, { timeCompleted: totalCompletionTime });

	const timeSummaryNode = screen.getByText('time', { exact: false });
	const timeFromNode = timeSummaryNode.textContent.match(/[\d.]+/)[0];

	expect(timeFromNode).toBe('10.52');
});
