/**
 * 常數
 */
const SPACE = 'Space'
const FLEX = 'flex'
const NONE = 'none'
const VISIBLE = 'visible'
const HIDDEN = 'hidden'
const CIRCLE = 'circle'
const DIAMOND = 'diamond'
const TRIANGLE = 'triangle'
const CROSS = 'cross'
const STAR = 'star'

/**
 * Dom
 */
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
const leftCircle = document.querySelector('.left-circle')
const leftCross = document.querySelector('.left-cross')
const leftDiamond = document.querySelector('.left-diamond')
const leftStar = document.querySelector('.left-star')
const leftTriangle = document.querySelector('.left-triangle')
const rightCircle = document.querySelector('.right-circle')
const rightCross = document.querySelector('.right-cross')
const rightDiamond = document.querySelector('.right-diamond')
const rightStar = document.querySelector('.right-star')
const rightTriangle = document.querySelector('.right-triangle')
const leftCard = document.querySelector('.left-card')
const rightCard = document.querySelector('.right-card')
const checkTrue = document.querySelector('#check-true')
const checkFail = document.querySelector('#check-fail')
const time = document.querySelector('.time')
const timerBar = document.querySelector('.timer-bar')
const loginInfo = document.querySelector('.login-info')
const login = document.querySelector('.login')
const account = document.querySelector('#account')
const password = document.querySelector('#password')

/**
 * 變數
 */
const symbols = [DIAMOND, DIAMOND, DIAMOND, TRIANGLE, TRIANGLE, TRIANGLE, CROSS, STAR, CIRCLE]
let correctCounts = 0
let incorrectCounts = 0
let missedCounts = 0
let performanceRate = 0
let getRandomCounts = 0
let leftSymbolItem = ''
let rightSymbolItem = ''
let alreadyEqual = false // 是否點擊相同
const gameTime = 2 // 分鐘
const randomSymbolTime = 1 // 秒
const delayEqualTime = 2 // 秒
let randomInterval // 隨機倒數定時器
const userData = {
  game: 'reactionSpeed',
  account: 'FTTW',
  password: 'Afttw4785',
}

/**
 * 監聽
 */
window.addEventListener('keydown', handleKeydown)
start.addEventListener('click', startClickHandler)
equal.addEventListener('click', equalClickHandler)
restart.addEventListener('click', restartClickHandler)
login.addEventListener('click', loginHandler)

/**
 * 進到介紹介面
 */
function goToInstructionPage() {
  resultInfo.style.display = NONE
  mainInfo.style.display = FLEX
}

/**
 * 進到遊戲介面
 */
function goToGamePage() {
  mainInfo.style.display = NONE
  gameInfo.style.display = FLEX
}

/**
 * 進到結果介面
 */
function goToResultPage() {
  gameInfo.style.display = NONE
  resultInfo.style.display = FLEX
}

function loginHandler() {
  const userAccount = account.value
  const userPassword = password.value

  if (userAccount === userData.account && userPassword === userData.password) {
    goToInstructionPage()
    loginInfo.style.display = NONE
    userData.loginTime = new Date().getTime().toString()
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }
}

/**
 * 點擊空白鍵
 */
function handleKeydown(e) {
  if (e.code === SPACE) {
    equalClickHandler()
  }
}

/**
 * 重新開始
 */
function restartClickHandler() {
  goToInstructionPage()
  resetResult()
}

/**
 * 重置結果數據
 */
function resetResult() {
  correctCounts = 0
  incorrectCounts = 0
  missedCounts = 0
  performanceRate = 0
  getRandomCounts = 0
  timerBar.style.width = '0'
}

/**
 * 開始遊戲
 */
function startClickHandler () {
  goToGamePage()
  getSymbols()
  randomGetSymbols()
  startCountdown(gameTime)
  if (Math.floor(gameTime) === 1) {
    time.innerHTML = `${Math.floor(gameTime)} minute to go`
  } else {
    time.innerHTML = `${Math.floor(gameTime)} minutes to go`
  }
}

/**
 * 隨機圖片
 */
function randomGetSymbols() {
  clearInterval(randomInterval)
  randomInterval = setInterval(() => {
    if (alreadyEqual) return
    getSymbols()
  }, randomSymbolTime * 1000)
}

/**
 * 隨機取值
 */
function randomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length)
  return symbols[randomIndex]
}

/**
 * 取亂數顯示
 */
function getSymbols() {
  getRandomCounts++
  leftSymbolItem = randomSymbol()
  rightSymbolItem = randomSymbol()

  const leftSymbols = [leftCircle, leftCross, leftDiamond, leftStar, leftTriangle]
  const rightSymbols = [rightCircle, rightCross, rightDiamond, rightStar, rightTriangle]

  hideAllSymbols(leftSymbols)
  hideAllSymbols(rightSymbols)

  showSymbol(leftSymbolItem, leftSymbols)
  showSymbol(rightSymbolItem, rightSymbols)
}

/**
 * 判斷圖形隱藏圖片
 */
function hideAllSymbols(symbols) {
  symbols.forEach(symbol => {
    hiddenSymbols(symbol)
  })
}

/**
 * 判斷圖形顯示圖片
 */
function showSymbol(symbolType, symbols) {
  switch (symbolType) {
    case CIRCLE:
      visibleSymbols(symbols[0]);
      break;
    case CROSS:
      visibleSymbols(symbols[1]);
      break;
    case DIAMOND:
      visibleSymbols(symbols[2]);
      break;
    case STAR:
      visibleSymbols(symbols[3]);
      break;
    case TRIANGLE:
      visibleSymbols(symbols[4]);
      break;
    default:
      break;
  }
}

/**
 * 隱藏圖片
 */
function hiddenSymbols(object) {
  object.style.visibility = HIDDEN
}

/**
 * 顯示圖片
 */
function visibleSymbols(object) {
  object.style.visibility = VISIBLE
}

/**
 * 選中相同
 */
function addActive(targetClass) {
  leftCard.classList.add(targetClass)
  rightCard.classList.add(targetClass)
}

/**
 * 點擊是否相同
 */
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

  clearInterval(randomInterval)

  setTimeout(() => {
    removeActive()
    getSymbols()
    randomGetSymbols()
  }, delayEqualTime * 1000)
}

/**
 * 移除相同
 */
function removeActive() {
  alreadyEqual = false
  checkTrue.style.display = NONE
  checkFail.style.display = NONE
  leftCard.classList.remove('bg-green')
  rightCard.classList.remove('bg-green')
  leftCard.classList.remove('bg-red')
  rightCard.classList.remove('bg-red')
}

/**
 * 輸出結果
 */
function outputResult() {
  missedCounts = getRandomCounts - correctCounts - incorrectCounts
  performanceRate = Math.round((correctCounts / (correctCounts + incorrectCounts + missedCounts)) * 100) || 0
  correct.innerHTML = correctCounts.toString()
  incorrect.innerHTML = incorrectCounts.toString()
  missed.innerHTML = missedCounts.toString()
  performance.innerHTML = `${performanceRate.toString()}%`
}

/**
 *  倒數計時
 */
function startCountdown(duration) {
  let timer = duration * 60
  let timeWidth = 100

  function updateCountdown() {
    const minutes = Math.floor(timer / 60)

    if ((minutes + 1) === 1) {
      time.innerHTML = `${(minutes + 1).toString()} minute to go`
    } else {
      time.innerHTML = `${(minutes + 1).toString()} minutes to go`
    }

    if (timeWidth >= 0) {
      timerBar.style.width = `${timeWidth}%`
      timeWidth -= 100 / (gameTime * 60)
    }

    if (timer === 0) {
      goToResultPage()
      outputResult()
      clearInterval(interval)
    } else {
      timer--
    }
  }

  updateCountdown()
  const interval = setInterval(updateCountdown, 1000)
}

