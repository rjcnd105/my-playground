function flow2(abc, cd, de, ef, fg, gh, hi, ij, jk) {
  switch (arguments.length) {
    case 1:
      return abc;
    case 2:
      // ab
      return function () {
        const argumentsAB = arguments
        // bc
        return function () {
          cd(abc.apply(this, argumentsAB).apply(this, arguments));
        }
      };
    case 3:
      return function () {
        const argumentsAB = arguments
        return function () {
          de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))
        }
      };
    case 4:
      return function () {
        const argumentsAB = arguments
        return function () {
          ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))
        }
      };
    case 5:
      return function () {
        const argumentsAB = arguments
        return function () {
          fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))
        }
      };
    case 6:
      return function () {
        const argumentsAB = arguments
        return function () {
          gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))
        }
      };
    case 7:
      return function () {
        const argumentsAB = arguments
        return function () {
          hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))
        }
      };
    case 8:
      return function () {
        const argumentsAB = arguments
        return function () {
          ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments))))))))
        }
      };
    case 9:
      return function () {
        const argumentsAB = arguments
        return function () {
          jk(ij(hi(gh(fg(ef(de(cd(abc.apply(this, argumentsAB).apply(this, arguments)))))))))
        }
      };
  }
  return;
}

module.exports.flow2 = flow2