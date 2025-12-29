class CardRow {
  constructor(id) {
    this.className = "row";
    this.id = `row${id}`;
    this.slots = [];
    // Add row (with empty cardslots) to div
    let baize = document.getElementById("baize");
    this.row = document.createElement("div");
    this.row.id = `row${id}`;
    this.row.className = this.className;
    baize.appendChild(this.row);
  }

  addSlot(id) {
    let newSlot = new CardSlot(`slot${id}`);
    this.slots.push(newSlot.slot);
    this.row.appendChild(newSlot.slot);
    return newSlot;
  }
}

class CardSlot {
  constructor(id) {
    this.id = id;
    this.className = "slot";
    this.slot = document.createElement("div");
    this.slot.id = this.id;
    this.slot.className = this.className;
    this.hasCard = false;
    this.cardVal = -1;
  }

  addCard(cardVal) {
    this.card = new Card(cardVal);
    this.cardVal = cardVal;
    this.slot.append(this.card.card);
    this.hasCard = true;
  }

  removeCard() {
    this.slot.removeChild(this.slot.firstChild);
    this.cardVal = -1;
    this.hasCard = false;
  }
}

class Card {
  constructor(val = 0) {
    this.val = val;
    this.card = document.createElement("div");
    this.card.className = "card";
    this.card.dots1 = document.createElement("div");
    this.card.dots1.className = "dots1";
    this.card.append(this.card.dots1);
    // Add six divs of class "dot" and give them colors if val requires it
    let colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "magenta",
      "cyan",
      "grey",
      "lime"
    ];

    let dot;
    for (let pow = 0; pow < 6; pow++) {
      dot = document.createElement("div");
      dot.className = "dot";
      if (val & (2 ** pow)) {
        dot.className += " " + colors[pow];
      }
      this.card.dots1.append(dot);
    }
    // If additional dots are required (val  > 128), add div.dots2
    if (val > 63) {
      this.card.dots2 = document.createElement("div");
      this.card.dots2.className = "dots2";
      this.card.append(this.card.dots2);
      for (let pow = 6; pow < 9; pow++) {
        dot = document.createElement("div");
        dot.className = "dot";
        if (val & (2 ** pow)) {
          dot.className += " " + colors[pow];
        }
        this.card.dots2.append(dot);
      }
    }
  }
}

class Proset {
  constructor() {
    //this.difficultyListener = e => this.keyStartGame(e);
    this.level = 0; // This needs to be set to 3 thru 9 in order to begin a game
    this.Init();
  }

  Init() {
    this.level = 0;

    //console.log(`Entering level select, level set to ${this.level}`)
    const baize = document.getElementById("baize");
    baize.replaceChildren(); // This should remove the existing listeners for level-select clicks
    let numRows = 3;
    // Initialize three rows
    let row0 = new CardRow(0);
    let row1 = new CardRow(1);
    let row2 = new CardRow(2);
    // Initialize seven card slots
    let slot0 = row0.addSlot(0);
    let slot1 = row0.addSlot(1);
    let slot2 = row1.addSlot(2);
    let slot3 = row1.addSlot(3);
    let slot4 = row1.addSlot(4);
    let slot5 = row2.addSlot(5);
    let slot6 = row2.addSlot(6);
    // Initialize seven cards: 7, 15, 31, 63, 127, 255, 511
    slot0.addCard(0b000000111);
    slot1.addCard(0b000001111);
    slot2.addCard(0b000011111);
    slot3.addCard(0b000111111);
    slot4.addCard(0b001111111);
    slot5.addCard(0b011111111);
    slot6.addCard(0b111111111);
    slot0.slot.addEventListener("pointerdown", () => this.startGame(3))
    slot1.slot.addEventListener("pointerdown", () => this.startGame(4))
    slot2.slot.addEventListener("pointerdown", () => this.startGame(5))
    slot3.slot.addEventListener("pointerdown", () => this.startGame(6))
    slot4.slot.addEventListener("pointerdown", () => this.startGame(7))
    slot5.slot.addEventListener("pointerdown", () => this.startGame(8))
    slot6.slot.addEventListener("pointerdown", () => this.startGame(9))
  }


  startGame(difficulty) {
    this.level = difficulty;

    // Delete existing rows
    const baize = document.getElementById("baize");
    baize.replaceChildren(); // This should remove existing pointerdown listeners (from level select or in-progress game)

    this.row0 = new CardRow(0);
    this.row1 = new CardRow(1);
    this.row2 = new CardRow(2);

    // Initialize N+1 card slots in appropriate places
    switch (difficulty) {
      case 3:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row1.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slots = [this.slot0, this.slot1,
                      this.slot2, this.slot3];
        break;
      case 4:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row1.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row1.addSlot(4);
        this.slots = [this.slot0, this.slot1,
                this.slot2, this.slot3, this.slot4];
        break;
      case 5:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row1.addSlot(2);
        this.slot99 = this.row1.addSlot(99);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row2.addSlot(4);
        this.slot5 = this.row2.addSlot(5);
        this.slots = [this.slot0, this.slot1,
                this.slot2,             this.slot3,
                      this.slot4, this.slot5];
        break;
      case 6:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row1.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row1.addSlot(4);
        this.slot5 = this.row2.addSlot(5);
        this.slot6 = this.row2.addSlot(6);
        this.slots = [this.slot0, this.slot1,
                this.slot2, this.slot3, this.slot4,
                      this.slot5, this.slot6];
        break;
      case 7:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row0.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row1.addSlot(4);
        this.slot5 = this.row2.addSlot(5);
        this.slot6 = this.row2.addSlot(6);
        this.slot7 = this.row2.addSlot(7);
        this.slots = [this.slot0, this.slot1, this.slot2,
                            this.slot3, this.slot4,
                      this.slot5, this.slot6, this.slot7];
        break;
      case 8:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row0.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row1.addSlot(4);
        this.slot5 = this.row1.addSlot(5);
        this.slot6 = this.row2.addSlot(6);
        this.slot7 = this.row2.addSlot(7);
        this.slot8 = this.row2.addSlot(8);
        this.slots = [this.slot0, this.slot1, this.slot2,
                      this.slot3, this.slot4, this.slot5,
                      this.slot6, this.slot7, this.slot8];
        break;
      case 9:
        this.slot0 = this.row0.addSlot(0);
        this.slot1 = this.row0.addSlot(1);
        this.slot2 = this.row0.addSlot(2);
        this.slot3 = this.row1.addSlot(3);
        this.slot4 = this.row1.addSlot(4);
        this.slot5 = this.row1.addSlot(5);
        this.slot6 = this.row1.addSlot(6);
        this.slot7 = this.row2.addSlot(7);
        this.slot8 = this.row2.addSlot(8);
        this.slot9 = this.row2.addSlot(9);
        this.slots = [this.slot0, this.slot1, this.slot2,
                this.slot3, this.slot4, this.slot5, this.slot6,
                      this.slot7, this.slot8, this.slot9];
        break;
      default:
        this.Init();
    }
    this.deck = new Deck(2 ** difficulty);
    this.deck.shuffle();
    for (let slot of this.slots) {
      this.deck.deal(slot);
    }
    // Remove the "choose difficulty" text
    let $score = document.getElementById("score");
    $score.innerHTML = `<div id="timer"><span id="timerspan"></span></div><div id="cardsleft"><span id="cardsspan"></span></div>`;

    // Initialize timer
    let initialTime = new Date();
    this.$timer = document.getElementById("timerspan");
    clearInterval(this.timerFunction);
    this.timerFunction = setInterval(
      () => this.updateTimer(initialTime, this.$timer),
      100
    );

    // Initialize Cards-remaining counter
    this.$cardsLeft = document.getElementById("cardsspan");
    this.$cardsLeft.textContent = `Cards in deck: ${this.deck.deck.length}`;

    // Set pointerdown functions for each card slot
    for (let startSlot of this.slots) {
      startSlot.slot.addEventListener("pointerdown", e => {
        e.preventDefault();
        wasClicked(startSlot, game, difficulty);
      });
    }

    // Initialize array of selected slots
    this.selected = [];
  }

  updateTimer(init, $timer) {
    let elapsed = new Date() - init;
    let timeStr = new Date(elapsed).toISOString().substring(11, 19);
    $timer.textContent = timeStr;
  }
}

class Deck {
  constructor(numCards) {
    this.deck = [];
    this.remaining = numCards - 1;
    for (let i = 1; i < numCards; i++) {
      this.deck.push(i);
    }
  }

  shuffle() {
    let j, tempCard;
    for (let i = 1; i < this.deck.length; i++) {
      j = Math.floor(Math.random() * this.deck.length);
      tempCard = this.deck[j];
      this.deck[j] = this.deck[i];
      this.deck[i] = tempCard;
    }
  }

  deal(slot) {
    let nextCard = this.deck.pop();
    slot.addCard(nextCard);
  }
}

function wasClicked(slot, game, level) {
  // Check if clicked slot has a card in it
  if (slot.hasCard) {
    // Toggle selected status of card
    if (game.selected.includes(slot.cardVal)) {
      let spliceIndex = game.selected.indexOf(slot.cardVal);
      game.selected.splice(spliceIndex, 1);
      slot.slot.classList.remove("selected");
    } else {
      game.selected.push(slot.cardVal);
      slot.slot.classList.add("selected");
    }

    // console.log(game.selected);

    // Check if the selected cards form a projective set
    if (isProSet(game.selected)) {
      // console.log("A SET WAS FOUND");
      // remove cards from play
      for (let cardslot of game.slots) {
        if (game.selected.includes(cardslot.cardVal)) {
          cardslot.slot.classList.remove("selected");
          cardslot.removeCard();
          if (game.deck.deck.length > 0) {
            cardslot.addCard(game.deck.deck.pop());
          }
        }
      }
      game.$cardsLeft.textContent = `Cards in deck: ${game.deck.deck.length}`;
      game.selected = [];
      // check for win condition
      // if win: stop timer
      if (won(game, game.deck)) {
        clearInterval(game.timerFunction);
        game.$timer.style = "color:blue";
        game.$cardsLeft.style = "color:blue";
        game.$cardsLeft.textContent = `${level}-dot game complete!`;
      }
    }
  }
}

function isProSet(array) {
  if (array.length === 0) return false;
  let xor = (x, y) => x ^ y;
  let reduced = array.reduce(xor);
  return reduced === 0;
}

function won(game, deck) {
  if (deck.deck.length > 0) return false;
  for (let slot of game.slots) {
    if (slot.hasCard) {
      return false;
    }
  }
  return true;
}

function clearSelected(game, level) {
  for (let slot of game.slots) {
    // Unselect cardslot class
    slot.slot.classList.remove("selected");
  }
  game.selected = [];
}