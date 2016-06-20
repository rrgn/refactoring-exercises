
describe('workOrSleepIn', function() {
  it('sleeps in on weekeds', function() {
    expect(workOrSleepIn(0)).toEqual('Sleep In');
    expect(workOrSleepIn(6)).toEqual('Sleep In');
  });

  it('works on week days', function() {
    expect(workOrSleepIn(1)).toEqual('Work');
    expect(workOrSleepIn(2)).toEqual('Work');
    expect(workOrSleepIn(3)).toEqual('Work');
    expect(workOrSleepIn(4)).toEqual('Work');
    expect(workOrSleepIn(5)).toEqual('Work');
  });

  it('throws error if invalid day', function() {
    expect(function() {
      workOrSleepIn(10);
    }).toThrow(new Error('Invalid day: 10'));
  });
});

describe('daysInMonth', function() {
  it('returns 28 for Feburary', function() {
    expect(daysInMonth(2)).toEqual(28);
  });

  it('returns 30 for 4, 6, 9, and 11', function() {
    expect(daysInMonth(4)).toEqual(30);
    expect(daysInMonth(6)).toEqual(30);
    expect(daysInMonth(9)).toEqual(30);
    expect(daysInMonth(11)).toEqual(30);
  });

  it('returns 31 for 1, 3, 5, 7, 8, 10, 12', function() {
    expect(daysInMonth(1)).toEqual(31);
    expect(daysInMonth(3)).toEqual(31);
    expect(daysInMonth(5)).toEqual(31);
    expect(daysInMonth(7)).toEqual(31);
    expect(daysInMonth(8)).toEqual(31);
    expect(daysInMonth(10)).toEqual(31);
    expect(daysInMonth(12)).toEqual(31);
  });

  it('throws error on invalid month', function() {
    expect(function() {
      daysInMonth(13);
    }).toThrow(new Error('Invalid month: 13'));
  });
});

describe('getIcon', function() {
  it('should return green icon for above 4 rating', function() {
    expect(getIcon({ avgRating: 4 })).toEqual('images/green.png');
    expect(getIcon({ avgRating: 5 })).toEqual('images/green.png');
  });

  it('should return orange icon for between 2 and 4 rating', function() {
    expect(getIcon({ avgRating: 2 })).toEqual('images/orange.png');
    expect(getIcon({ avgRating: 3.9 })).toEqual('images/orange.png');
  });

  it('should return red icon for below 2 rating', function() {
    expect(getIcon({ avgRating: 0 })).toEqual('images/red.png');
    expect(getIcon({ avgRating: 1.9 })).toEqual('images/red.png');
  });
});

describe('tallyGrades', function() {
  it('tallys nothing', function() {
    expect(tallyGrades([])).toEqual({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0
    });
  });

  it('tallys correctly', function() {
    var students = [
      { name: 'Jerry', grade: 93 },
      { name: 'Arnav', grade: 81 },
      { name: 'Lee', grade: 77 },
      { name: 'Merrin', grade: 56 },
      { name: 'Kramer', grade: 9 },
      { name: 'Denise', grade: 100 },
      { name: 'Anya', grade: 95 },
      { name: 'Dat', grade: 70 },
      { name: 'Carl', grade: 64 },
      { name: 'Larry', grade: 88 },
      { name: 'Jan', grade: 0 },
    ];
    expect(tallyGrades(students)).toEqual({
      A: 3,
      B: 2,
      C: 2,
      D: 1,
      F: 3
    });
  });

  it('one more test just in case you are cheating', function() {
    var students = [
      { name: 'Jerry', grade: 93 },
      { name: 'Lee', grade: 77 },
      { name: 'Merrin', grade: 56 },
      { name: 'Kramer', grade: 9 }
    ];
    expect(tallyGrades(students)).toEqual({
      A: 1,
      B: 0,
      C: 1,
      D: 0,
      F: 2
    });
  });
});

describe('distance', function() {
  it('calculates distance between 2 points correctly', function() {
    expect(distance({ x: 0, y: 0}, { x: 1, y: 1})).toBeCloseTo(1.41);
    expect(distance({ x: 0, y: 0}, { x: 2, y: 2})).toBeCloseTo(2.83);
  });
});


/*
A quick and dirty monkey-patcher with undo. I made it for testing.
Usage:

var patcher = new MonkeyPatcher();

patcher.patch(Math, 'random', function() {
  return 0;
});

For tear down in your tests:

patcher.undo();

*/
function MonkeyPatcher() {
  this.patches = [];
}
MonkeyPatcher.prototype.patch = function(object, property, value) {
  this.patches.unshift({
    object: object,
    property: property,
    originalValue: object[property]
  });
  object[property] = value;
};
MonkeyPatcher.prototype.undo = function() {
  this.patches.forEach(function(entry) {
    entry.object[entry.property] = entry.originalValue;
  });
};

describe('fight', function() {
  var human;
  var goblin;
  var patcher;
  beforeEach(function() {
    patcher = new MonkeyPatcher();
    human = { power: 5, health: 10 };
    goblin = { power: 4, health: 6 };
  });
  afterEach(function() {
    patcher.undo();
  });
  it('hits human and goblin for points equal to power', function() {
    patcher.patch(Math, 'random', function() {
      return 0;
    });
    fight(human, goblin);
    expect(human.health).toEqual(6);
    expect(goblin.health).toEqual(1);
  });

  it('hits human for double points', function() {
    patcher.patch(Math, 'random', function() {
      return 0.3;
    });
    fight(human, goblin);
    expect(human.health).toEqual(2);
    expect(goblin.health).toEqual(1);
  });

  it('hits both for double points', function() {
    patcher.patch(Math, 'random', function() {
      return 0.6;
    });
    fight(human, goblin);
    expect(human.health).toEqual(2);
    expect(goblin.health).toEqual(-4);
  });
});

describe('roshambo', function() {
  it('should give correct answers', function() {
    expect(roshambo('rock', 'sissors')).toEqual('player 1');
    expect(roshambo('rock', 'paper')).toEqual('player 2');
    expect(roshambo('rock', 'rock')).toEqual('draw');

    expect(roshambo('sissors', 'sissors')).toEqual('draw');
    expect(roshambo('sissors', 'paper')).toEqual('player 1');
    expect(roshambo('sissors', 'rock')).toEqual('player 2');

    expect(roshambo('paper', 'sissors')).toEqual('player 2');
    expect(roshambo('paper', 'paper')).toEqual('draw');
    expect(roshambo('paper', 'rock')).toEqual('player 1');
  });
});

describe('newDeck', function () {
  it('has all the cards', function () {
    var deck = newDeck();
    expect(deck.length).toEqual(52);
    var stringRepresentation = deck.map(function(card) {
      return card.point + ' of ' + card.suit;
    }).join(',');
    expect(stringRepresentation).toEqual('1 of spades,1 of hearts,1 of clubs,1 of diamonds,2 of spades,2 of hearts,2 of clubs,2 of diamonds,3 of spades,3 of hearts,3 of clubs,3 of diamonds,4 of spades,4 of hearts,4 of clubs,4 of diamonds,5 of spades,5 of hearts,5 of clubs,5 of diamonds,6 of spades,6 of hearts,6 of clubs,6 of diamonds,7 of spades,7 of hearts,7 of clubs,7 of diamonds,8 of spades,8 of hearts,8 of clubs,8 of diamonds,9 of spades,9 of hearts,9 of clubs,9 of diamonds,10 of spades,10 of hearts,10 of clubs,10 of diamonds,11 of spades,11 of hearts,11 of clubs,11 of diamonds,12 of spades,12 of hearts,12 of clubs,12 of diamonds,13 of spades,13 of hearts,13 of clubs,13 of diamonds');
  });
});

describe('Tic Tac Toe', function() {
  it('reports wins correctly', function() {
    expect(ticTacToe([
      ['O', 'O', 'O'],
      [],
      [],
    ])).toEqual('O');
    expect(ticTacToe([
      [],
      ['O', 'O', 'O'],
      [],
    ])).toEqual('O');
    expect(ticTacToe([
      [],
      [],
      ['O', 'O', 'O'],
    ])).toEqual('O');
    expect(ticTacToe([
      ['O'],
      ['O'],
      ['O'],
    ])).toEqual('O');
    expect(ticTacToe([
      ['', 'O', ''],
      ['', 'O', ''],
      ['', 'O', ''],
    ])).toEqual('O');
    expect(ticTacToe([
      ['', '', 'O'],
      ['', '', 'O'],
      ['', '', 'O'],
    ])).toEqual('O');
    expect(ticTacToe([
      ['', '', 'O'],
      ['', 'O', ''],
      ['O', '', ''],
    ])).toEqual('O');
    expect(ticTacToe([
      ['O', ' ', ' '],
      [' ', 'O', ' '],
      [' ', ' ', 'O'],
    ])).toEqual('O');

    expect(ticTacToe([
      ['X', 'X', 'X'],
      [],
      [],
    ])).toEqual('X');
    expect(ticTacToe([
      [],
      ['X', 'X', 'X'],
      [],
    ])).toEqual('X');
    expect(ticTacToe([
      [],
      [],
      ['X', 'X', 'X'],
    ])).toEqual('X');
    expect(ticTacToe([
      ['X'],
      ['X'],
      ['X'],
    ])).toEqual('X');
    expect(ticTacToe([
      ['', 'X', ''],
      ['', 'X', ''],
      ['', 'X', ''],
    ])).toEqual('X');
    expect(ticTacToe([
      ['', '', 'X'],
      ['', '', 'X'],
      ['', '', 'X'],
    ])).toEqual('X');
    expect(ticTacToe([
      ['', '', 'X'],
      ['', 'X', ''],
      ['X', '', ''],
    ])).toEqual('X');
    expect(ticTacToe([
      ['X', ' ', ' '],
      [' ', 'X', ' '],
      [' ', ' ', 'X'],
    ])).toEqual('X');
  });

  it('reports draws', function() {
    expect(ticTacToe([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])).toEqual(null);
    expect(ticTacToe([
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['X', 'X', 'O']
    ])).toEqual(null);
    expect(ticTacToe([
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['O', 'X', 'O']
    ])).toEqual(null);
  });
});
