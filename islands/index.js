/**
 * Loop through two dimensional array.
 */
function* loop2DimArray(map) {
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      yield {
        x: colIndex,
        y: rowIndex,
        val: row[colIndex]
      };
    }
  }
}

/**
 * Add unique ID to each cell on the map and mark it with isLand flag.
 */
function markMap(map) {
  const modifiedMap = [];

  for (const { x, y, val } of loop2DimArray(map)) {
    modifiedMap[y] = modifiedMap[y] || [];
    modifiedMap[y][x] = {
      isLand: val === 1,
      id: y + '_' + x
    };
  }

  return modifiedMap;
}

/**
 * Find neighbors IDs for each land and skip land that does not have neighbors.
 * @param map
 * @return {Object}. Map of ID of land and it's neighbors IDs: { 2: [1, 3] }
 */
function findNeighborsIdsForEachLand(map) {
  const landGroups = {};

  for (const { x, y, val: { isLand, id } } of loop2DimArray(map)) {
    if (!isLand) {
      continue;
    }

    const getIdOrNull = (x, y) => (map[y] && map[y][x] && map[y][x].isLand && map[y][x].id) || null;

    const neighbors = [
      getIdOrNull(x, y - 1),
      getIdOrNull(x + 1, y),
      getIdOrNull(x, y + 1),
      getIdOrNull(x - 1, y)
    ].filter(x => x !== null);

    if (neighbors.length > 0) {
      landGroups[id] = neighbors;
    }
  }

  return landGroups;
}

/**
 * Take one land as a main one and mark each neighbors of this land with main ID.
 */
function groupNeighborsToMainGroup(landNeighbors) {
  const result = {};
  const mappingToMainId = {};

  for (let id of Object.keys(landNeighbors)) {
    const mainId = mappingToMainId[id] || id;

    for (let neighborId of landNeighbors[id]) {
      if (!mappingToMainId[neighborId]) {
        result[mainId] = result[mainId] || new Set();
        result[mainId].add(neighborId);

        mappingToMainId[neighborId] = mainId;
      }
    }
  }

  return result;
}

function findIdsOfLargestLandGroup(landGroups) {
  return Object.values(landGroups)
    .map(ids => Array.from(ids))
    .map(ids => ({ length: ids.length, ids }))
    .sort((a, b) => b.length - a.length)[0];
}

function main(map) {
  const markedMap = markMap(map);
  const neighborIds = findNeighborsIdsForEachLand(markedMap);
  const landGroups = groupNeighborsToMainGroup(neighborIds);
  const largestIsland = findIdsOfLargestLandGroup(landGroups);

  console.log(largestIsland.length);
  largestIsland.ids
    .map(id => id.split('_'))
    .forEach(([y, x]) => console.log({ y, x }))
}

main([
  [0, 0, 1, 0],
  [1, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [1, 1, 0, 0]
]);

