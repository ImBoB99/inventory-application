function createMoviesData(dbRows) {
  const resultMap = new Map();

  dbRows.forEach((movieRow) => {
    if (resultMap.has(movieRow.id)) {
      const existingMovie = resultMap.get(movieRow.id);
      existingMovie.actorIds.push(movieRow.actorid);
      existingMovie.actors.push(movieRow.actorname);
    } else {
      const tempObj = {
        id: movieRow.id,
        name: movieRow.moviename,
        genre: movieRow.genrename,
        actorIds: [movieRow.actorid],
        actors: [movieRow.actorname],
      };
      resultMap.set(movieRow.id, tempObj);
    }
  });

  const resultMoviesArray = Array.from(resultMap.values());
  return resultMoviesArray;
}

module.exports = createMoviesData;