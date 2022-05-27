function flow2(abc, cd, de, ef, fg, gh, hi, ij, jk) {
  switch (arguments.length) {
    case 1:
      return abc;
    case 2:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return cd(abc.apply(this, argumentsAB).apply(this, arguments));
        }
      };
    case 3:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))
        }
      };
    case 4:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))
        }
      };
    case 5:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))
        }
      };
    case 6:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))
        }
      };
    case 7:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))
        }
      };
    case 8:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))))
        }
      };
    case 9:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          return jk(ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))))
        }
      };
  }
  return;
}

module.exports.flow2 = flow2