import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Board from './Board.svelte';

it('should render 3 Letter components', () => {
	render(Board, {
		letters: [
			{ value: 'a', state: 'used' },
			{ value: 'b', state: 'used' },
			{ value: 'c', state: 'used' }
		],
		moveLetter: () => {
			return;
		}
	});

	expect(screen.getAllByTestId('value-container').length).toBe(3);
});

it('should properly hook moveLetter to a function', async () => {
	const user = userEvent.setup();

	let status = 'fail';
	let moveLetterCallback = () => {
		status = 'pass';
	};
	render(Board, { letters: [{ value: 'a', state: 'used' }], moveLetter: moveLetterCallback });

	await user.click(screen.getByTestId('value-container'));

	expect(status).toBe('pass');
});
