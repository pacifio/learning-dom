// 3 way eqaution solve

const MODE_1 = "FORMULA";
const MODE_2 = "FACTORY";

const MODE = MODE_2;

function formula(a, b, c, mode) {
  if (mode === "+") {
    return (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  } else {
    return (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  }
}

(function () {
  let equation = "2x-8x-6";
  if (equation.includes("+") && equation.includes("-")) {
  } else {
    let a, b, c, extracted;

    if (equation.includes("+") && !equation.includes("-")) {
      extracted = equation.split("+");
    } else {
      extracted = equation.split("-");
    }

    a = extracted[0].substring(0, extracted[0].length - 1);
    b = extracted[1].substring(0, extracted[1].length - 1);
    c = parseInt(extracted[2]);

    a = a === "" ? "1" : a;
    b = b === "" ? "1" : b;
    a = parseInt(a);
    b = parseInt(b);

    let x1, x2;

    if (equation.includes("-") && !equation.includes("+")) {
      a = -a;
      b = -b;
      c = -c;
    }

    if (MODE == "FORMULA") {
      x1 = formula(a, b, c, "+");
      x2 = formula(a, b, c, "-");
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
        x2 = -r1;
      }

      let r3 = a / -b_;
      x1 = r3;
    }

    if (typeof x2 != "number") {
      x1 = formula(a, b, c, "+");
      x2 = formula(a, b, c, "-");
    }

    console.log(x1);
    console.log(x2);
  }
})();
