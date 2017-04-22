var inquirer = require("inquirer");
var fs = require("fs");

cardCreate();

function cardCreate() {
  function BasicCard(front, back) {
    this.front = front;
    this.back = back;
  }

  function ClozeCard(full, partial, cloze) {
    this.full = fullText;
    this.partial = partialText;
    this.cloze = clozeText;
  }
  inquirer.prompt([
    //inquirer for type of card
    {
      type: "list",
      message: "Make a basic flash card or a cloze flash card, your choice:",
      choices: ["BASIC", "CLOZE"],
      name: "cardChoice"
    }
  ]).then(function(count) {
    inquirer.prompt([
      //inquirer for how many cards
      {
        type: "input",
        message: "How many cards do you want to make?",
        name: "cardCount",
        default: 0
      }
    ]).then(function(choice) {
      if (choice.cardChoice === "BASIC") {
        //count to allow the looping
        var bCount = 0;
        var basicArray = [];
        var askBasic = function() {

          if (bCount < cardCount) {
            console.log("NEW BASIC FLASHCARD #" + bCount++);
            //prompt to make basic cards
            inquirer.prompt([
              //input for basic cards
              {
                type: "input",
                message: "What is on the front of the card?",
                name: "frontBasic"
              },
              {
                type: "input",
                message: "What is on the back of the card?",
                name: "backBasic"
              }
              //function to create basic cards & push them to array
            ]).then(function(createBasic) {
              var newBasicCard = JSON.stringify(new BasicCard(
                createBasic.front,
                createBasic.back));

              basicArray.push(newBasicCard + "\n");
              // BasicCard.prototype.printInfo = function() {
              //   console.log("Front: " + this.front + "\n" "Back: " + this.back + "\n");
              //   console.log("---------------");
              // };
              bCount++;
              askBasic();

            });
            //appending basic card array to outside text file
            fs.appendFile("basicCards.txt", "\n" + basicArray + "\n");

          } else {
            for (var x = 0; x < basicArray.length; x++) {
              basicArray[x].printInfo();
            }
          }
        };
      } else if (choice.cardChoice === "CLOZE") {

        //count to allow the looping
        var cCount = 0;
        var clozeArray = [];
        var askCloze = function() {

          if (cCount < cardcount) {
            console.log("NEW CLOZE FLASHCARD #" + cCount);
            //prompt to make basic cards
            inquirer.prompt([
              //input for close cards, full statment, partial, & cloze section
              {
                type: "input",
                message: "What is the full statement on the cloze card?",
                name: "fullCloze",
              },
              {
                type: "input",
                message: "What do you want to make the partial cloze?",
                name: "partialCloze"
              },
              {
                type: "input",
                message: "What do you want to cloze?",
                name: "clozeSegment"
              }
              //function to create variables & then choose to do whatever with them
            ]).then(function(createCloze) {
              var fullClozeCard = JSON.stringify(new ClozeCard(createCloze.fullCloze));
              var partialClozeCard = JSON.stringify(new ClozeCard(createCloze.partialCloze));
              var clozeClozeCard = JSON.stringify(new ClozeCard(createCloze.clozeSegment));

              clozeArray.push(fullClozeCard + "\n");
              // ClozeCard.prototype.printInfo = function() {
              //   console.log("Full: " + this.full + "\n" "Partial: " + this.partial + "\n" + "Cloze: " + this.cloze);
              //   console.log("---------------");
              // };
              cCount++;
              askCloze();

            });
            //append array of full statement close cards to outside file
            fs.appendFile("clozeCards.txt", "\n" + clozeArray + "\n");

          } else {
            for (var x = 0; x < clozeArray.length; x++) {
              clozeArray[x].printInfo();
            }
          }

        };
        askBasic();
        askCloze();
      };

    });
  });
}
