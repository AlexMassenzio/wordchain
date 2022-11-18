import { render, screen } from '@testing-library/svelte';
import Letter from './Letter.svelte';

it('renders content with a single character', () => {
	render(Letter, { letter: { value: 'h', state: 'used' } });

	expect(screen.getByTestId('value-container')).toHaveTextContent('H');
});
