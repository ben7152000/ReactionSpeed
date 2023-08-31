// 常數
const SPACE = 'Space'
const FLEX = 'flex'
const NONE = 'none'

// Dom
const mainInfo = document.querySelector('.main-info')
const gameInfo = document.querySelector('.game-info')
const resultInfo = document.querySelector('.result-info')
const start = document.querySelector('.start')
const equal = document.querySelector('.equal')
const restart = document.querySelector('.restart')
const correct = document.querySelector('#correct')
const incorrect = document.querySelector('#incorrect')
const missed = document.querySelector('#missed')
const performance = document.querySelector('#performance')
const leftSymbol = document.querySelector('#left-symbol')
const rightSymbol = document.querySelector('#right-symbol')
const leftCard = document.querySelector('.left-card')
const rightCard = document.querySelector('.right-card')
const checkTrue = document.querySelector('#check-true')
const checkFail = document.querySelector('#check-fail')
const time = document.querySelector('.time')
const timerBar = document.querySelector('.timer-bar')

// 變數
const symbols = ['▲', '●', '★', '✚', '♦']
let correctCounts = 0
let incorrectCounts = 0
let missedCounts = 0
let performanceRate = 0
let leftSymbolItem = ''
let rightSymbolItem = ''
let alreadyEqual = false
const gameTime = 2 // 分鐘
const randomSymbolTime = 1 // 秒
const delayEqualTime = 2 // 秒

// 監聽
window.addEventListener('keydown', handleKeydown)
start.addEventListener('click', startClickHandler)
equal.addEventListener('click', equalClickHandler)
restart.addEventListener('click', restartClickHandler)

// 開始遊戲
function startClickHandler () {
  mainInfo.style.display = NONE
  gameInfo.style.display = FLEX
  startCountdown(gameTime)
}

// 重新開始
function restartClickHandler() {
  resultInfo.style.display = NONE
  mainInfo.style.display = FLEX
  resetResult()
}

// 點擊空白鍵
function handleKeydown(e) {
  if (e.code === SPACE) {
    equalClickHandler()
  }
}

// 隨機取值
function randomGetSymbols() {
  const randomIndex = Math.floor(Math.random() * symbols.length)
  return symbols[randomIndex]
}

// 取亂數
function randomGetSymbol() {
  leftSymbolItem = randomGetSymbols()
  rightSymbolItem = randomGetSymbols()
  leftSymbol.innerHTML = leftSymbolItem
  rightSymbol.innerHTML = rightSymbolItem
}

// 是否相同
function equalClickHandler() {
  if (alreadyEqual) return
  alreadyEqual = true

  if (leftSymbolItem === rightSymbolItem) {
    correctCounts++
    checkTrue.style.display = FLEX
    addActive('bg-green')
  } else {
    incorrectCounts++
    checkFail.style.display = FLEX
    addActive('bg-red')
  }

  setTimeout(() => {
    removeActive()
    // randomGetSymbol()
  }, delayEqualTime * 1000)
}

// 選中相同
function addActive(targetClass) {
  leftCard.classList.add(targetClass)
  rightCard.classList.add(targetClass)
}

// 移除相同
function removeActive() {
  alreadyEqual = false
  checkTrue.style.display = NONE
  checkFail.style.display = NONE
  leftCard.classList.remove('bg-green')
  rightCard.classList.remove('bg-green')
  leftCard.classList.remove('bg-red')
  rightCard.classList.remove('bg-red')
}

// 輸出結果
function outputResult() {
  performanceRate = Math.round((correctCounts / (correctCounts + incorrectCounts + missedCounts)) * 100) || 0
  correct.innerHTML = correctCounts.toString()
  incorrect.innerHTML = incorrectCounts.toString()
  missed.innerHTML = missedCounts.toString()
  performance.innerHTML = `${performanceRate.toString()}%`
}

// 重置結果數據
function resetResult() {
  correctCounts = 0
  incorrectCounts = 0
  missedCounts = 0
  performanceRate = 0
  timerBar.style.width = '0'
}

// 倒數計時器
function startCountdown(duration) {
  let timer = duration * 60
  let timeWidth = 100

  function updateCountdown() {
    const minutes = Math.floor(timer / 60)

    if (timer === gameTime * 60) {
      time.innerHTML = minutes.toString()
    } else {
      time.innerHTML = (minutes + 1).toString()
    }

    if (timeWidth >= 0) {
      timerBar.style.width = `${timeWidth}%`
      timeWidth -= 100 / (gameTime * 60)
    }

    if (timer === 0) {
      gameInfo.style.display = NONE
      resultInfo.style.display = FLEX
      outputResult()
      clearInterval(interval)
    } else {
      timer--
      if (alreadyEqual) return
      missedCounts++
      randomGetSymbol()
    }
  }

  updateCountdown()
  const interval = setInterval(updateCountdown, randomSymbolTime * 1000)
}

