const display = document.querySelector('#output');
const backlog = document.querySelector('#backlog');
const allBtns = document.querySelectorAll('#keyboard-area button');
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('#decimal');
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const signBtn = document.querySelector('#sign');
const backspaceBtn = document.querySelector('#backspace');
const kbrdBtn = document.querySelector('#keyboard');
const soundBtn = document.querySelector('#sound');
const backlogBtn = document.querySelector('#history')

window.addEventListener('keydown', enableKeyboardSupport);
backlogBtn.addEventListener('click', toggleBacklog);
soundBtn.addEventListener('click', toggleSound);
kbrdBtn.addEventListener('click', toggleShortcuts);
backspaceBtn.addEventListener('click', deleteLastChar);
decimalBtn.addEventListener('click', hitDecimal);
equalBtn.addEventListener('click', getResult);
clearBtn.addEventListener('click', clearDisplay);
signBtn.addEventListener('click', flipSign);
allBtns.forEach(button => {
	button.addEventListener('click', playSound) 
});
numBtns.forEach(button => {
	button.addEventListener('click', hitNumber) 
});
operatorBtns.forEach(button => {
	button.addEventListener('click', hitOperator) 
});

let firstOperand;
let secondOperand;
let cachedNum;
let lastClicked = 'operator';
let result = '';

function hitNumber() {
	clearBtn.firstChild.textContent = 'CE';
	if ((display.textContent === '0') || 
		(lastClicked == 'operator') ||
		(lastClicked == 'equal')) {
		lastClicked = 'number';
		display.textContent = this.textContent;
		updateBacklog(this.textContent);
	} else {
		if (display.textContent.length > 14) {
			alert('What are you doing?');
			display.textContent = display.textContent.substring(0,14);
		}
		display.textContent += this.textContent;
		updateBacklog(this.textContent);
	}
};

function hitOperator() {
	clearBtn.firstChild.textContent = 'CE';
	firstOperand = display.textContent;
	operator = this.textContent;
	lastClicked = 'operator';
	updateBacklog(operator);
}

function getResult() {
	clearBtn.firstChild.textContent = 'CE';
	secondOperand = display.textContent;
	if (firstOperand) {
		if (lastClicked == 'equal') {
			firstOperand = display.textContent;
			secondOperand = cachedNum;
		}
		display.textContent = operate(firstOperand, operator, secondOperand);
	}
	lastClicked = 'equal';
	cachedNum = secondOperand;
	updateBacklog('=' + result);
}

function updateBacklog(data) {
	if (backlog.textContent.length > 35) {
		backlog.textContent = backlog.textContent.substring(0,35);
	} else if ((display.textContent === '0') && (backlog.textContent !== '')) {
		backlog.textContent = backlog.textContent.slice(0,-1) + data;
	}
	backlog.textContent += data;
}

function hitDecimal() {
	clearBtn.firstChild.textContent = 'CE';
	if ((lastClicked == 'operator') || 
		(lastClicked == 'equal')) {
		display.textContent = '0' + this.textContent;
		lastClicked = 'number';
		updateBacklog('0'+this.textContent);
	} else if (!display.textContent.includes('.')) {
		display.textContent += this.textContent;
		updateBacklog(this.textContent);
	}
}

function clearDisplay() {
	if (this.firstChild.textContent == 'CE') {
		this.firstChild.textContent = 'AC';
		display.textContent = '0';
	} else {
		display.textContent = '0';
		lastClicked = 'operator';
		firstOperand = 0;
		secondOperand = 0;
		cachedNum = 0;
		backlog.textContent = '';
	}
}

function deleteLastChar() {
	if (display.textContent.length <= 1) {
		display.textContent = '0';
		updateBacklog(' ');
	} else {
		display.textContent = display.textContent.substring(0, display.textContent.length - 1);
		backlog.textContent = backlog.textContent.substring(0, backlog.textContent.length - 1);
	}
}

function flipSign() {
	display.textContent *= -1;
	if (display.textContent < 0) {
		backlog.textContent = backlog.textContent.substring(0, backlog.textContent.length - (display.textContent.length-1));
		updateBacklog(display.textContent);
	} else {
		backlog.textContent = backlog.textContent.substring(0, backlog.textContent.length - (display.textContent.length+1));
		updateBacklog(display.textContent);
	}
}

function toggleShortcuts() {
	const hiddenKbrdShortcuts = document.querySelectorAll('#keyboard-area .hidden-shortcut');
	const hiddenCtrlShortcuts = document.querySelectorAll('#controls .hidden-shortcut');
	
	for (let i = 0; i<hiddenKbrdShortcuts.length; i++) {
		hiddenKbrdShortcuts[i].style.display = hiddenKbrdShortcuts[i].style.display === 'none' ? 'inline-block' : 'none';
	}

	for (let i = 0; i<hiddenCtrlShortcuts.length; i++) {
		hiddenCtrlShortcuts[i].style.display = hiddenCtrlShortcuts[i].style.display === 'none' ? 'block' : 'none';
	}
}

function toggleBacklog() {
	backlog.style.display = backlog.style.display === '' ? 'none' : '';
}

function enableKeyboardSupport(e) {
	// e.preventDefault();
	for (let i = 0; i < numBtns.length; i++) {
		if (e.key === numBtns[i].textContent) {
			numBtns[i].click();
		}
	}

	const operators = {
		'*': '×',
		'/': '÷',
		'+': '+', 
		'-': '-'
	};
	
	if (operators.hasOwnProperty(e.key)) {
		for (let i = 0; i<operatorBtns.length; i++){
			if(operators[e.key] === operatorBtns[i].textContent) {
				operatorBtns[i].click();
			}
		}
	}

	if (e.key === 'Backspace') backspaceBtn.click();
	if ((e.key === 'Enter') || (e.key === '=')) equalBtn.click();
	if (e.key === 'Escape') clearBtn.click();
	if (e.key === '.') decimalBtn.click();
	if (e.key === 'q') kbrdBtn.click();
	if (e.key === 'v') soundBtn.click();
	if (e.key === 'h') backlogBtn.click();
}

function toggleSound() {
	const icon = document.querySelector('#sound img');
	if (icon.className === '') {
		icon.src = 'favicons/mute-icon-128.png';
		icon.className = 'off'
	} else {
		icon.src = 'favicons/volume-up-icon-128.png';
		icon.className = '';
	}
}

function playSound() { 
	const audio = document.querySelector('audio');
	const icon = document.querySelector('#sound img');
	audio.currentTime = 0;

	if (icon.className === 'off') {
		audio.pause();
	} else {
		audio.play();
	}
}

const operate = (a, operator, b) => {
  
	if (operator === '+') {
	  result = +a + +b;
	} 
	if (operator === '-') {
	  result = +a - +b
	}
	if (operator === '×') {
	  result = +a * +b
	}
	if (operator === '÷') {
		if(+b === 0) {
			return 'Ha ha... Nice try!'
		}
	  result = +a / +b
	}
	
	result = parseFloat(result.toFixed(3))
	return result;
}