import fetch from "node-fetch";

function dayTwo() {
  //Exercicío 1: Executar exemplos anteriores ao do slide

  function getReq() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved Promisse");
        // reject("Promisse Error");
        // throw new Error("Error");
      }, 5000);
    });
  }

  getReq().then(console.log).catch(console.log).finally(console.log);

  //Exercicío 2: Executar exemplos anteriores ao do slide

  function searchCep(params) {
    let cep;
    fetch(`https://viacep.com.br/ws/${params}/json/`)
      .then((res) => res.json())
      .then((data) => {
        cep = data.cep;
        console.log(`CEP found: ${cep}`);
      })
      .catch(console.error);
    return cep;
  }
  searchCep("13845373");

  //Exercicío 3: Criar seu próprio exemplo

  function getImages() {
    fetch("https://picsum.photos/v2/list?page=1&limit=2")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }

  getImages();
}

export default dayTwo;
