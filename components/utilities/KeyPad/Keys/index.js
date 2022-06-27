import { useState, useEffect, useRef } from "react"
import FunctionKeys from "../FunctionKeys"
import Key from "../Key"

import classes from './styles.module.scss'


// change this to only show certain buttons for current needs (remove large words buttons on login page)
const letterArray = [
  ['_'],
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
  ['J', 'K', 'L'],
  ['M', 'N', 'O'],
  ['P', 'Q', 'R', 'S',],
  ['T', 'U', 'V',],
  ['W', 'X', 'Y', 'Z'],
  ['PalletDeck'], ['LoadBar'], ['Blankets']
]

const numberArray = [
  ['1'], ['2'], ['3'],
  ['4'], ['5'], ['6'],
  ['7'], ['8'], ['9'],
  [''], ['0'], ['']
]

const Keys = ({ inputRef, setInput, onEnter, keypadButtonRef, keypadRef }) => {
  const [currentKey, setCurrentKey] = useState(null)
  const [keyType, setKeyType] = useState('ABC')
  const [keyArray, setKeyArray] = useState(numberArray)
  const timerRef = useRef()

  const keyResetTimer = () => {
    timerRef.current = setTimeout(() => {setCurrentKey(null)}, 650);
  }

  const Cancel = () => {
    setKeyType('ABC')
    setKeyArray(numberArray)
  }

  const ChangeKeys = () => {
    setKeyType(val => val == 'ABC' ? '123' : 'ABC')
    setKeyArray(val => val == numberArray ? letterArray : numberArray)
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, []);

  const handleClick = ( inputValue, keyId ) => {
    clearTimeout(timerRef.current)
    if (inputRef.current.value.length >= 20) return
	  setCurrentKey(keyId)
    if (keyId == currentKey && isNaN(inputRef.current.value.slice(-1)) && inputValue.length == 1 && inputValue !== '_') {
      inputRef.current.value = inputRef.current.value.slice(0, -1) + inputValue
    } else {
      inputRef.current.value += inputValue
    }
    setInput(inputRef.current.value)
    keyResetTimer()
  }

  return (
    <main className={classes.keypad}>
      <div className={classes.keypadKeys}>
        {keyArray.map((keys, index) => (
          <Key
            key={`key-${index}`}
            id={index}
            currentKey={currentKey}
            onClick={handleClick}
            keyType={keyType}
            keys={keys}
            />
        ))}
      </div>
      <div className={classes.functionKeys}>
      <FunctionKeys
      inputRef={inputRef}
      onEnter={onEnter}
      onCancel={Cancel}
      onChangeKeys={ChangeKeys}
      setInput={setInput}
      keypadButtonRef={keypadButtonRef}
      keypadRef={keypadRef}
      />
      </div>
    </main>
  )
}

export default Keys