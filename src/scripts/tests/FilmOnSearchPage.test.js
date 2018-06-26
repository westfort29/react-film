import React from 'react';
import { FilmOnSearchPage } from '../';
import renderer from 'react-test-renderer';

const FILM = {
  id: 68718,
  title: "Django Unchained",
  tagline: "Life, liberty and the pursuit of vengeance.",
  vote_average: 7.9,
  vote_count: 12144,
  release_date: "2012-12-25",
  poster_path: "https://image.tmdb.org/t/p/w500/5WJnxuw41sddupf8cwOxYftuvJG.jpg",
  overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
  budget: 100000000,
  revenue: 425368238,
  genres: [
    "Drama",
    "Western"
  ],
  runtime: 165
}

test('FilmOnSearchPage should contain right data', () => {
  const component = renderer.create(
    <FilmOnSearchPage
      film={ FILM }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

