function flow2(abc, cd, de, ef, fg, gh, hi, ij, jk) {
  switch (arguments.length) {
    case 1:
      return abc;
    case 2:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          cd(abc.apply(this, argumentsAB).apply(this, arguments));
        }
      };
    case 3:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))
        }
      };
    case 4:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))
        }
      };
    case 5:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))
        }
      };
    case 6:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))
        }
      };
    case 7:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))
        }
      };
    case 8:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))))
        }
      };
    case 9:
      return function ab() {
        const argumentsAB = arguments
        return function bc() {
          jk(ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))))
        }
      };
  }
  return;
}

exports.flow2 = flow2