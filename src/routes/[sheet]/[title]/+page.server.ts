import { getSheet } from '$lib/gsheets-api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
// Potentially swap to https://www.npmjs.com/package/google-spreadsheet

export const load = (async ({ params }) => {
  // const post = await getPostFromDatabase(params.slug);
 
  const data = await getSheet(params.sheet, params.title)

  if (data) {
    return data;
  }
 
  throw error(404, 'Not found');
}) satisfies PageServerLoad;
