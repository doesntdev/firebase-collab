const { getPosSpaces, getAllJumps, posJumps, posMvs, initMatch} = require('./ruleEngine');

// [12, 13, 14, 15]

// let match = {
//       blkUID: "A",
//       boardState: (32) ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "e", "e", "e", "e", "e", "e", "e", "e", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
//       redUID: "A",
//       status: "active",
//       turn: {color: "r", chain: false, chainSpace: null},
//     };

test('get all the moves, test match', () => {
  const match = {
        blkUID: "AAA",
        boardState: ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "e", "e", "e", "e", "e", "e", "e", "e", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        redUID: "AAA",
        status: "active",
        turn: {color: "r", chain: false, chainSpace: null},
      };
  expect(initMatch('r', 'AAA', 'AAA')).toEqual(match);
});

test('test test with posJumps', () => {
  expect(posJumps()).toBe(2);
});

test('test test with posMvs', () => {
  expect(posMvs()).toEqual([12, 13, 14, 15]);
});
