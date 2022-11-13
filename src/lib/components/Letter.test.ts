import { render, screen } from '@testing-library/svelte';
import Letter from './Letter.svelte';

it('renders content with a single character', () => {
	render(Letter, { value: 'h' });

	expect(screen.getByTestId('value-container')).toHaveTextContent('H');
});
