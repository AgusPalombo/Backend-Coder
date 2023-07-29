// Función para sumar dos números positivos
function sumar(a, b) {
    return new Promise((resolve, reject) => {
      if (a > 0 && b > 0) {
        resolve(a + b);
      } else {
        reject(new Error("Ambos números deben ser positivos."));
      }
    });
  }
  
  // Función para restar dos números positivos
  function restar(a, b) {
    return new Promise((resolve, reject) => {
      if (a > 0 && b > 0) {
        if (a >= b) {
          resolve(a - b);
        } else {
          reject(new Error("La resta de números negativos no está permitida."));
        }
      } else {
        reject(new Error("Ambos números deben ser positivos."));
      }
    });
  }
  
  // Función para multiplicar dos números positivos
  function multiplicar(a, b) {
    return new Promise((resolve, reject) => {
      if (a > 0 && b > 0) {
        resolve(a * b);
      } else {
        reject(new Error("Ambos números deben ser positivos."));
      }
    });
  }
  
  // Función para dividir dos números positivos
  function dividir(a, b) {
    return new Promise((resolve, reject) => {
      if (b !== 0 && a > 0 && b > 0) {
        resolve(a / b);
      } else {
        reject(new Error("No se puede dividir por cero o ambos números no son positivos."));
      }
    });
  }
  
  // Ejemplo de uso
  async function calcular(a,b) {
    try {
      const resultadoSuma = await sumar(a, b);
      console.log("Suma:", resultadoSuma);
  
      const resultadoResta = await restar(a, b);
      console.log("Resta:", resultadoResta);
  
      const resultadoMultiplicacion = await multiplicar(a, b);
      console.log("Multiplicación:", resultadoMultiplicacion);
  
      const resultadoDivision = await dividir(a, b);
      console.log("División:", resultadoDivision);
    } catch (error) {
      console.error(error.message);
    }
  }
  
const a = parseInt(prompt("Ingrese el primer numero: "))
const b = parseInt(prompt("Ingrese el segundo numero: "))

if (isNaN(a) || isNaN(b)) {
    reject(new Error("Ambos valores deben ser números válidos."));
}
else{
    calcular(a,b);
}



  