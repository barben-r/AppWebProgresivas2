// let result = undefined;

// function waitUntil(mesj) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(mesj);
//     }, 2000);
//   });
// }

// function multiplicar(num1, num2) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num1 * num2);
//     }, 1500);
//   });
// }

// function dividir(num1, num2) {
//   return new Promise((resolve, reject) => {
//     setTimeout(reject(num1 / num2), 2000);
//   });
// }

// // Promise.all([multiplicar(1,2),dividir(1,2)]).then((result)=>{
// //     console.log(result);
// // }).
// // catch((err)=>{
// //     console.log(err);
// // })

// function multiplicarLento(num1, num2) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(num1 * num2), 2000);
//   });
// }

// function dividirRapido(num1, num2) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject(num1 / num2), 1000);
//   });
// }

// Promise.race([multiplicarLento(1, 2), dividirRapido(1, 2)])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// waitUntil('Puras promesas aqui').then((result)=>{
//     console.log(result);
// }).
// catch((err)=>{
//     console.log(err);
// });
/////////////////////////////////////////////////////////////////////////////////////////////
// EJERCICIO 1
let random = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.floor(Math.random() * (100 - 1) + 1)), 2000);
  });
};
let cuadrado = (c) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(c * c), 3000);
  });
};

let raiz = (sqt) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.sqrt(sqt)), 1000);
  });
};
random()
  .then((res) => {
    console.log(res);
    cuadrado(res)
      .then((res) => {
        console.log(res);
        raiz(res)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
/////////////////////////////////////////////////////////////////////////////////////////////
// EJERCICIO 2
function fetchUrls(urls) {
  const fetchPromises = [];
  for (const url of urls) {
    fetchPromises.push(
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al obtener ${url}, Código de estado: ${response.status}`
            );
          }
          return response.json();
        })
        .catch((error) => {
          throw new Error(`Error al obtener ${url}: ${error.message}`);
        })
    );
  }
  return Promise.all(fetchPromises);
}

const urls = [
  "https://reqres.in/api/users",
  "https://jsonplaceholder.typicode.com/todos",
  "https://pokeapi.co/api/v2/type/3",
];

fetchUrls(urls)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });
/////////////////////////////////////////////////////////////////////////////////////////////
// EJERCICIO 3
const promesa1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa 1");
    }, 1000);
  });
};

const promesa2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa 2");
    }, 2000);
  });
};

const funciones = [promesa1, promesa2];

ejecutarPromesasEnParalelo(funciones)
  .then((resultados) => {
    console.log(resultados);
  })
  .catch((error) => {
    console.error(error);
  });
/////////////////////////////////////////////////////////////////////////////////////////////
// EJERCICIO 4
function crearPromesasConRetraso(n, tiempoDeEspera) {
  const promesas = [];

  for (let i = 1; i <= n; i++) {
    const promesa = new Promise((resolve) => {
      setTimeout(() => {
        console.log(i);
        resolve();
      }, tiempoDeEspera);
    });
    promesas.push(promesa);
  }

  return Promise.all(promesas).then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Todas las promesas se resolvieron");
      }, tiempoDeEspera);
    });
  });
}

crearPromesasConRetraso(5, 1000)
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  });
/////////////////////////////////////////////////////////////////////////////////////////////
// EJERCICIO 5
function crearPromesaConCancelacion() {
  let promesaResuelta = false;

  const promesa = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (!promesaResuelta) {
        resolve("Promesa resuelta después de 5 segundos");
      }
    }, 5000);

    const cancel = () => {
      if (!promesaResuelta) {
        clearTimeout(timeoutId);
        promesaResuelta = true;
        reject("Promesa cancelada");
      }
    };
    promesa.cancel = cancel;
  });

  return promesa;
}

const miPromesa = crearPromesaConCancelacion();

miPromesa
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  });
setTimeout(() => {
  miPromesa.cancel();
}, 2000);
