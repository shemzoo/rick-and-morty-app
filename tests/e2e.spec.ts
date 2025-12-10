import { expect, test } from '@playwright/test';

import characters from './fixtures/characters.json' with { type: 'json' };

const characterToSearch = 'Rick Sanchez';
const filteredResponse = {
  info: { count: 1, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: new Date().toISOString()
    }
  ]
};

test('should load correct initial 5 characters and then filter them by name', async ({
  page
}) => {
  await page.route(
    'https://rickandmortyapi.com/api/character?*',
    async (route) => {
      const url = new URL(route.request().url());
      const name = url.searchParams.get('name');
      console.log(`Intercepted request for name: "${name}"`);

      if (name === characterToSearch) {
        console.log('Fulfilling with FILTERED response.');
        await route.fulfill({ json: filteredResponse });
      } else {
        console.log('Fulfilling with INITIAL response.');
        await route.fulfill({ json: characters });
      }
    }
  );

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByTestId('character-card')).toHaveCount(5);

  await page
    .getByTestId('search-input')
    .pressSequentially(characterToSearch, { delay: 50 });

  await expect(page.getByTestId('character-card')).toHaveCount(1);
  await expect(page.getByTestId('character-card')).toContainText(
    characterToSearch
  );
});
