/*
A building has 100 floors. One of the floors is the highest floor an egg can be dropped 
from without breaking. If an egg is dropped from above that floor, it will break. If it is 
dropped from that floor, it will break. If it is dropped from that floor or below, it will
be completely undamaged and you can drop the egg again. Give two eggs, find the highest floor
an egg can be dropped from without breaking, with as few drops as possible. 
*/

const dropTheEgg = (numOfFloors, levelEggBreaks) => {
  let floorForEggTwo = 0;
  let numOfDrops = 0;
  let levelFound = false;

  for (let floor = 0; floor < numOfFloors; floor += 10) {
    numOfDrops++;    
    if(floor > levelEggBreaks) {
      floorForEggTwo = (floor - 10); 
      break;
    } else if (floor === levelEggBreaks) {
      levelFound = true;
      break;
    }
  }

  if(levelFound === true) {
    console.log(numOfDrops);
    return numOfDrops;
  }

  for(let floor2 = floorForEggTwo; floor2 <= (floorForEggTwo + 10); floor2++) {
    numOfDrops++;
    if(floor2 === levelEggBreaks){
      break;
    }
  }

  console.log(numOfDrops);
  return numOfDrops;
}

dropTheEgg(100, 60);
dropTheEgg(100, 73);