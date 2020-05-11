const getName = (req, res) => {
  console.log("In getName()");
  console.log("body:", req.body.code);

  /* parseCode method parses actual superhero code from dialed code i.e. user input */
  let parsedCode = parseCode(req.body.code);

  console.log("Parsed Code:", parsedCode);

  /* filltering all those superHeroNames whose length is equal to the length off parsedCode  */

  let filteredSuperHeroNames = superHeroNames.filter(
    (item) => item.length === parsedCode.length
  );

  console.log("filter array:", filteredSuperHeroNames);

  /* mapCodeToLetter method maps user input code to correspondin letters */

  let mappedCode = mapCodeToLetter(parsedCode);

  console.log("mappedCode:", mappedCode);

  /* findSuperHero is the main method which encompasses the core logic to backtrack super hero name from user input code */

  let superHero = findSuperHero(
    parsedCode.length,
    filteredSuperHeroNames,
    mappedCode
  );

  return res.json({ Hero: superHero });
};

const parseCode = (userInput) => {
  return userInput.toString().split(" ")[1];
};

const mapCodeToLetter = (parsedCode) => {
  let arr = [];
  [...parsedCode].forEach((c) => {
    [dialPadMapping[c]].forEach((e) => {
      arr.push(e.toString());
    });
  });

  return arr;
};

const findSuperHero = (len, superHeroArray, mappedCode) => {
  let counter = 0;
  let str = "";
  for (let i = 0; i < superHeroArray.length; i++) {
    let name = superHeroArray[i];
    let charOfName = [...name];

    console.log("aa", charOfName);
    let oriMappedCode = [...mappedCode];

    for (let k = 0; k < charOfName.length; k++) {
      for (let j = 0; j < oriMappedCode.length; j++) {
        if (oriMappedCode[j].includes(charOfName[k])) {
          console.log("ori:", oriMappedCode);
          oriMappedCode.splice(j, 1);
          counter++;
        } else {
          break;
        }
      }
    }
    if (counter === len) {
      str = name;
    } else {
      counter = 0;
    }
  }
  console.log("HERO::", str);
  return str;
};

const superHeroNames = [
  "SUPERMAN",
  "THOR",
  "ROBIN",
  "IRONMAN",
  "GHOSTRIDER",
  "CAPTAINAMERICA",
  "FLASH",
  "WOLVERINE",
  "BATMAN",
  "HULK",
  "BLADE",
  "PHANTOM",
  "SPIDERMAN",
  "BLACKWIDOW",
  "HELLBOY",
  "PUNISHER",
];

const dialPadMapping = {
  "0": "",
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
};

exports.getName = getName;
