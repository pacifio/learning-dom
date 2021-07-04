// 3 way eqaution solve

const MODE_1 = "FORMULA";
const MODE_2 = "FACTORY";

const MODE = MODE_1;

(function () {
  let equation = "2x+8x+6";
  if (equation.includes("+") && equation.includes("-")) {
  } else if (equation.includes("+")) {
    let extracted = equation.split("+");

    let a = extracted[0].substring(0, extracted[0].length - 1);
    let b = extracted[1].substring(0, extracted[1].length - 1);
    let c = parseInt(extracted[2]);

    a = a === "" ? "1" : a;
    b = b === "" ? "1" : b;
    a = parseInt(a);
    b = parseInt(b);

    let x1, x2;

    if (MODE == "FORMULA") {
      x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
      x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    } else {
      let c_ = a * c;
      if (a !== 1) {
        c_ = a * c;
      }

      let a_, b_;
      for (let i = 1; i < c_; i++) {
        let division = c_ / i;
        if (division + i === b) {
          a_ = division;
          b_ = i;
          break;
        }
      }

      let r1 = a_ / a;
      let r2 = c / b_;
      if (r1 === r2) {
        x1 = -r1;
      }

      let r3 = a / -b_;
      x2 = r3;
    }

    console.log(x1);
    console.log(x2);
  } else {
    console.log(equation.split("-"));
  }
})();
