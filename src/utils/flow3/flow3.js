function flow3(abcd, de, ef, fg, gh, hi, ij, jk, kl) {
  switch (arguments.length) {
    case 1:
      return abcd;
    case 2:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments));
          }
        }
      };
    case 3:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments)));
          }
        }
      };
    case 4:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments))));
          }
        }
      };
    case 5:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return gh(fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments)))));
          }
        }
      };
    case 6:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return hi(gh(fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments))))));
          }
        }
      };
    case 7:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return ij(hi(gh(fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments)))))));
          }
        }
      };
    case 8:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return jk(ij(hi(gh(fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments))))))));
          }
        }
      };
    case 9:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          const argumentsBC = arguments
          return function cd() {
            return kl(jk(ij(hi(gh(fg(ef(de(abcd.apply(this, argumentsAB).apply(this, argumentsBC).apply(this, arguments)))))))));
          }
        }
      };
  }
  return;
}

exports.flow3 = flow3