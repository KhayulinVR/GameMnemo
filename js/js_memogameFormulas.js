(function(){
	
	//  объявляем объект, внутри которого будет происходить основная механика игры
	var Memory = {

		// создаём карточку
		init: function(cards){
			//  получаем доступ к классам
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// собираем из карточек массив — игровое поле
			this.cardsArray = cards;
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// и раскладываем их
			this.setup();
		},

		// как перемешиваются карточки
		shuffleCards: function(cardsArray){
			// используем встроенный метод .shuffle
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// раскладываем карты
		setup: function(){
			// подготавливаем код с карточками на страницу
			this.html = this.buildHTML();
			// добавляем код в блок с игрой
			this.$game.html(this.html);
			// получаем доступ к сформированным карточкам
			this.$memoryCards = $(".card");
			// на старте мы не ждём переворота второй карточки
			this.paused = false;
			// на старте у нас нет перевёрнутой первой карточки
     		this.guess = null;
     		// добавляем элементам на странице реакции на нажатия
			this.binding();
		},

		// как элементы будут реагировать на нажатия
		binding: function(){
			// обрабатываем нажатие на карточку
			this.$memoryCards.on("click", this.cardClicked);
			// и нажатие на кнопку перезапуска игры
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		// что происходит при нажатии на карточку
		cardClicked: function(){
			// получаем текущее состояние родительской переменной
			var _ = Memory;
			// и получаем доступ к карточке, на которую нажали
			var $card = $(this);
			// если карточка уже не перевёрнута и мы не нажимаем на ту же самую карточку второй раз подряд
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				// переворачиваем её
				$card.find(".inside").addClass("picked");
				// если мы перевернули первую карточку
				if(!_.guess){
					// то пока просто запоминаем её
					_.guess = $(this).attr("data-id");
				// если мы перевернули вторую и она совпадает с первой
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					// оставляем обе на поле перевёрнутыми и показываем анимацию совпадения
					$(".picked").addClass("matched");
					// обнуляем первую карточку
					_.guess = null;
						// если вторая не совпадает с первой
						} else {
							// обнуляем первую карточку
							_.guess = null;
							// не ждём переворота второй карточки
							_.paused = true;
							// ждём полсекунды и переворачиваем всё обратно
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// если мы перевернули все карточки
				if($(".matched").length == $(".card").length){
					// показываем победное сообщение
					_.win();
				}
			}
		},

		// показываем победное сообщение
		win: function(){
			// не ждём переворота карточек
			this.paused = true;
			// плавно показываем модальное окно с предложением сыграть ещё
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// показываем модальное окно
		showModal: function(){
			// плавно делаем блок с сообщением видимым
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		// прячем модальное окно
		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// перезапуск игры
		reset: function(){
			// прячем модальное окно с поздравлением
			this.hideModal();
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// раскладываем их на поле
			this.setup();
			// показываем игровое поле
			this.$game.show("slow");
		},

		// Тасование Фишера–Йетса - https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		// код, как добавляются карточки на страницу
		buildHTML: function(){
			// сюда будем складывать HTML-код
			var frag = '';
			// перебираем все карточки подряд
			this.$cards.each(function(k, v){
				// добавляем HTML-код для очередной карточки
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://i.postimg.cc/gJfN1rcv/2024-03-06-18-36-57-docx-WPS-Office.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			// возвращаем собранный код
			return frag;
		}
	};

// карточки
var cards = [
    {
        name: "Archimedes",
        img: "img/Card_memogameFormulas/Arhimeds'power.png",
        id: 1
    },
    {
        name: "Arhimeds'power_formula",
        img: "img/Card_memogameFormulas/Arhimeds'power_formula.png",
        id: 1
      // Same id as Archimedes to match as a pair
    },
    {
        name: "density",
        img: "img/Card_memogameFormulas/density.png",
        id: 2
      // Same id as Archimedes to match as a pair
    },
    {
        name: "density_formula",
        img: "img/Card_memogameFormulas/density_formula.png",
        id: 2
      // Same id as Archimedes to match as a pair
    },
    {
        name: "efficiency_factor(2)",
        img: "img/Card_memogameFormulas/efficiency_factor(2).png",
        id: 3
      // Same id as Archimedes to match as a pair
    },
    {
        name: "efficiency factor(2)_formula",
        img: "img/Card_memogameFormulas/efficiency factor(2)_formula.png",
        id: 3
      // Same id as Archimedes to match as a pair
    },
    {
        name: "efficiency factor",
        img: "img/Card_memogameFormulas/efficiency_factor.png",
        id: 4
      // Same id as Archimedes to match as a pair
    },
    {
        name: "efficiency factor_formula",
        img: "img/Card_memogameFormulas/efficiency_factor_formula.png",
        id: 4
      // Same id as Archimedes to match as a pair
    },
    {
        name: "gravity",
        img: "img/Card_memogameFormulas/gravity.png",
        id: 5
      // Same id as Archimedes to match as a pair
    },
    {
        name: "gravity_formula",
        img: "img/Card_memogameFormulas/gravity_formula.png",
        id: 5
      // Same id as Archimedes to match as a pair
    },
    {
        name: "kinetic_energy",
        img: "img/Card_memogameFormulas/kinetic_energy.png",
        id: 6
      // Same id as Archimedes to match as a pair
    },
    {
        name: "kinetic_energy_formula",
        img: "img/Card_memogameFormulas/kinetic_energy_formula.png",
        id: 6
      // Same id as Archimedes to match as a pair
    },
    {
        name: "liquid_pressure",
        img: "img/Card_memogameFormulas/liquid_pressure.png",
        id: 7
      // Same id as Archimedes to match as a pair
    },
    {
        name: "liquid_pressure_formula",
        img: "img/Card_memogameFormulas/liquid_pressure_formula.png",
        id: 7
      // Same id as Archimedes to match as a pair
    },
    {
        name: "power",
        img: "img/Card_memogameFormulas/power.png",
        id: 8
      // Same id as Archimedes to match as a pair
    },
    {
        name: "power_formula",
        img: "img/Card_memogameFormulas/power_formula.png",
        id: 8
      // Same id as Archimedes to match as a pair
    },
    {
        name: "pressure",
        img: "img/Card_memogameFormulas/pressure.png",
        id: 9
      // Same id as Archimedes to match as a pair
    },
    {
        name: "pressure_formula",
        img: "img/Card_memogameFormulas/pressure_formula.png",
        id: 9
      // Same id as Archimedes to match as a pair
    },
    {
        name: "speed",
        img: "img/Card_memogameFormulas/speed.png",
        id: 10
      // Same id as Archimedes to match as a pair
    },
    {
        name: "speed_formila",
        img: "img/Card_memogameFormulas/speed_formila.png",
        id: 10
      // Same id as Archimedes to match as a pair
    },
    {
        name: "speedup",
        img: "img/Card_memogameFormulas/speedup.png",
        id: 11
      // Same id as Archimedes to match as a pair
    },
    {
        name: "speedup_formula",
        img: "img/Card_memogameFormulas/speedup_formula.png",
        id: 11
      // Same id as Archimedes to match as a pair
    },
    {
        name: "the_speed_of_rect_linear_equidistant_motion",
        img: "img/Card_memogameFormulas/the_speed_of_rect_linear_equidistant_motion.png",
        id: 12
      // Same id as Archimedes to match as a pair
    },
    {
        name: "the_speed_of_rectilinear_equidistantmotion_formula",
        img: "img/Card_memogameFormulas/the_speed_of_rectilinear_equidistantmotion_formula.png",
        id: 12
      // Same id as Archimedes to match as a pair
    },
    {
        name: "The_moment_of_power",
        img: "img/Card_memogameFormulas/The_moment_of_power.png",
        id: 13
    },
    {
        name: "The_moment_of_power_formula",
        img: "img/Card_memogameFormulas/The_moment_of_power_formula.png",
        id: 13
      // Same id as Robert Brown
    },
    // Add all other scientist and discovery pairs following the same structure
    // Make sure each pair has the same id value
    {
        name: "the_strength_of_elasticity",
        img: "img/Card_memogameFormulas/the_strength_of_elasticity.png",
        id: 14
    },
    {
        name: "the_strength_of_elasticity_formula",
        img: "img/Card_memogameFormulas/the_strength_of_elasticity_formula.png",
        id: 14
      // Same id as Isaac Newton
    },
    {
        name: "work",
        img: "img/Card_memogameFormulas/work.png",
        id: 15
    },
    {
        name: "work_formula",
        img: "img/Card_memogameFormulas/work_formula.png",
        id: 15
      // Same id as Isaac Newton
    },
    // Continue adding other pairs
];
    
	// запускаем игру
	Memory.init(cards);


})();