// ======== маска для телефона ==========
$(document).ready(function() {
	let selector = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
		im.mask(selector);
})

const pagination = [...document.querySelectorAll('.pagination_scroll')]
const question = [...document.querySelectorAll('.question')]
const questions = document.querySelector('.question_answers')
const btn = document.querySelector('.btn-next')
const paginationMax = document.querySelector('.pagination_max')
const btnEnd = document.querySelector('.btn-end')
let paginationNum = document.querySelector('.pagination_num')
let form = document.querySelector('.quiz-form')
let otherInputText = document.querySelector('.label-input-text')
let otherInputRadio = document.querySelector('.other-input-radio')
let successTel = document.querySelector('.success_tel')
let successBlock = document.querySelector('.success')
let loadBlock = document.querySelector('.load')
let teather = document.querySelector('.teather')
let report = document.querySelector('.report')
let reportTxt = document.querySelector('.report_1')
let reportTel = document.querySelector('.report_2')


// ======== валидация ======== 
form.addEventListener('change', (event) => {
		btn.removeAttribute('disabled')	
})

otherInputText.onclick = function(){
	otherInputRadio.click()
	if(otherInputText.value.length < 3){
		btn.setAttribute('disabled', true)
	}
	otherInputText.oninput = function() {
		if(otherInputText.value.length > 2){
			btn.removeAttribute('disabled')
		}
		else{
			btn.setAttribute('disabled', true)
		}
		if(otherInputText.value[0] === ' ') {
	    otherInputText.value = '';
	  }
	  otherInputText.value = otherInputText.value.replace(/  /i, ' ')
	}
}

successTel.oninput = function() {
	if(successTel.value.indexOf('_') == -1){
			btnEnd.removeAttribute('disabled')
	}
		else{
			btnEnd.setAttribute('disabled', true)
		}
}

// ======== событие кнопки на клик ======== 
btn.onclick = function () {
	// ======== последняя страница ======== 
		if(+paginationNum.textContent == +paginationMax.textContent - 1){
			btn.style.display = 'none'
			loadBlock.classList.add('load-animate')
			teather.style.display = 'flex'
			const loadTimeout = setTimeout(function(){
				loadBlock.style.opacity = 0
				loadBlock.style.display = 'none'
				successBlock.style.opacity = 1
				successBlock.style.display = 'block'
				loadBlock.classList.add('load-active')
			}, 1500);

			// ======== анимация счетчика ======== 
			const time = 1490
			const step = 3
				function outNum(num, elem) {
				  let e = document.querySelector(".load-counter")
				  n = 0
				  let t = Math.round(time / (num / step))
				  let interval = setInterval(() => {
				    n = n + step
				    if (n == num) {
				      clearInterval(interval)
				    }
				    e.innerHTML = n
				  }, t)
				}
				outNum(100, ".load-counter")
			}

	if(+paginationNum.textContent < +paginationMax.textContent){
		// ======== пагинация ======== 
		paginationNum.textContent  = +paginationNum.textContent + 1

		// ======== ползунок ======== 
		pagination[+paginationNum.textContent - 1].classList.add('pagination_scroll__active')

		// ======== таб ======== 
		question.forEach(item => {
			item.classList.remove('question_active')
			item.style.opacity = 0
		})

		question[+paginationNum.textContent - 1].classList.add('question_active')
		const pageTimeout = setTimeout(function(){
			document.querySelector('.question_active').style.opacity = 1
		}, 50)

		// ======== снова сделаем кнопку неактивной ======== 
		btn.setAttribute('disabled', true);

	}
}

// ========= окно спасибо ========
form.addEventListener('submit', formSend)
async function formSend(e) {
	event.preventDefault()
	if(otherInputRadio.checked){
		reportTxt.textContent = otherInputText.value
	}
	else{
		reportTxt.textContent = form.elements["q1"].value
	}
	reportTel.textContent = successTel.value
	report.style.display = 'block'
	form.style.display = 'none'
}