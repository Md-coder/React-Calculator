import React, { useState } from 'react';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
function App() {
  const calcObject = {
    sign: '',
    num: 0,
    res: 0,
  };
  const buttonVals = [
    ['C', '+-', '%', '/'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];
  const [calc, setCalc] = useState(calcObject);

  const handleClickReset = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    });
  };

  const handleInvertClick = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: '',
    });
  };

  const handlePercentClick = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num: calc.num ? (calc.num /= 100) : 0,
      res: calc.res ? (calc.res /= 100) : 0,
      sign: '',
    });
  };

  const handleEqualClick = (e) => {
    e.preventDefault();
    if (!!calc.sign && !!calc.num) {
      const solve = (valA, valB, sign) => {
        return sign === '+'
          ? valA + valB
          : sign === '-'
          ? valA - valB
          : sign === 'X'
          ? valA * valB
          : valA / valB;
      };

      setCalc({
        ...calc,
        sign: '',
        res:
          calc.num === '0' && calc.sign === '/'
            ? "value can't divide by 0"
            : solve(Number(calc.res), Number(calc.num), calc.sign),
        num: 0,
      });
    }
  };

  const handleSignClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: val,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const handleDotClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + val : calc.num,
    });
  };

  const handleNumClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;

    setCalc({
      ...calc,
      num:
        calc.num === 0 && val === '0'
          ? '0'
          : calc.num % 1 === 0
          ? Number(calc.num + val)
          : calc.num + val,
      res: !calc.sign ? 0 : calc.res,
    });
  };

  const handleButtonClick = (btnVal) => {
    return btnVal === 'C'
      ? handleClickReset
      : btnVal === '+-'
      ? handleInvertClick
      : btnVal === '%'
      ? handlePercentClick
      : btnVal === '='
      ? handleEqualClick
      : btnVal === '/' || btnVal === 'X' || btnVal === '-' || btnVal === '+'
      ? handleSignClick
      : btnVal === '.'
      ? handleDotClick
      : handleNumClick;
  };
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {buttonVals.flat().map((val, i) => {
          return (
            <Button
              key={i}
              className={val === '=' ? 'equals' : ''}
              value={val}
              onClick={handleButtonClick(val)}
            ></Button>
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
