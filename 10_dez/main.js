function dayOne() {
  //Questão 1
  function readValue() {
    let a = 0;
    let b = 0;
    let numerosDentro = [];
    let numerosFora = [];

    const values = [9, 10, 12, 15, 16, 20, 24, 29, 30, 31];
    values.map((value) => {
      if (value >= 10 && value <= 20) {
        numerosDentro.push(value);
        a++;
      } else {
        numerosFora.push(value);
        b++;
      }
    });

    console.log(
      `${a} números estão dentro. Esses são os números: ${numerosDentro}`
    );
    console.log(
      `${b} números estão fora. Esses são os números: ${numerosFora}`
    );
  }
  readValue();

  //Questão 2
  function multiplyNumbers() {
    let listA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let listB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let listC = [];
    for (let i = 0; i < 10; i++) {
      listC.push(listA[i] * listB[i]);
    }
    console.log(`Os números são: ${listC}`);
  }

  multiplyNumbers();

  //Questão 3
  function oddAndEven() {
    let listA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let listB = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let listC = [];
    let index = 0;

    for (let i = 0; i < 20; i++) {
      if (i % 2 == 0) {
        listC.push(listA[index]);
      } else {
        listC.push(listB[index]);
        index++;
      }
    }
    console.log(`Os números são: ${listC}`);
  }

  oddAndEven();
}

export default dayOne;
