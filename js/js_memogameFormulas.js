(function(){
	
	//  ��������� ������, ������ �������� ����� ����������� �������� �������� ����
	var Memory = {

		// ������ ��������
		init: function(cards){
			//  �������� ������ � �������
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// �������� �� �������� ������ � ������� ����
			this.cardsArray = cards;
			// ������������ ��������
			this.shuffleCards(this.cardsArray);
			// � ������������ ��
			this.setup();
		},

		// ��� �������������� ��������
		shuffleCards: function(cardsArray){
			// ���������� ���������� ����� .shuffle
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// ������������ �����
		setup: function(){
			// �������������� ��� � ���������� �� ��������
			this.html = this.buildHTML();
			// ��������� ��� � ���� � �����
			this.$game.html(this.html);
			// �������� ������ � �������������� ���������
			this.$memoryCards = $(".card");
			// �� ������ �� �� ��� ���������� ������ ��������
			this.paused = false;
			// �� ������ � ��� ��� ����������� ������ ��������
     		this.guess = null;
     		// ��������� ��������� �� �������� ������� �� �������
			this.binding();
		},

		// ��� �������� ����� ����������� �� �������
		binding: function(){
			// ������������ ������� �� ��������
			this.$memoryCards.on("click", this.cardClicked);
			// � ������� �� ������ ����������� ����
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		// ��� ���������� ��� ������� �� ��������
		cardClicked: function(){
			// �������� ������� ��������� ������������ ����������
			var _ = Memory;
			// � �������� ������ � ��������, �� ������� ������
			var $card = $(this);
			// ���� �������� ��� �� ���������� � �� �� �������� �� �� �� ����� �������� ������ ��� ������
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				// �������������� �
				$card.find(".inside").addClass("picked");
				// ���� �� ����������� ������ ��������
				if(!_.guess){
					// �� ���� ������ ���������� �
					_.guess = $(this).attr("data-id");
				// ���� �� ����������� ������ � ��� ��������� � ������
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					// ��������� ��� �� ���� ������������ � ���������� �������� ����������
					$(".picked").addClass("matched");
					// �������� ������ ��������
					_.guess = null;
						// ���� ������ �� ��������� � ������
						} else {
							// �������� ������ ��������
							_.guess = null;
							// �� ��� ���������� ������ ��������
							_.paused = true;
							// ��� ���������� � �������������� �� �������
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// ���� �� ����������� ��� ��������
				if($(".matched").length == $(".card").length){
					// ���������� �������� ���������
					_.win();
				}
			}
		},

		// ���������� �������� ���������
		win: function(){
			// �� ��� ���������� ��������
			this.paused = true;
			// ������ ���������� ��������� ���� � ������������ ������� ���
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// ���������� ��������� ����
		showModal: function(){
			// ������ ������ ���� � ���������� �������
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		// ������ ��������� ����
		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// ���������� ����
		reset: function(){
			// ������ ��������� ���� � �������������
			this.hideModal();
			// ������������ ��������
			this.shuffleCards(this.cardsArray);
			// ������������ �� �� ����
			this.setup();
			// ���������� ������� ����
			this.$game.show("slow");
		},

		// ��������� ������������ - https://bost.ocks.org/mike/shuffle/
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

		// ���, ��� ����������� �������� �� ��������
		buildHTML: function(){
			// ���� ����� ���������� HTML-���
			var frag = '';
			// ���������� ��� �������� ������
			this.$cards.each(function(k, v){
				// ��������� HTML-��� ��� ��������� ��������
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://i.postimg.cc/gJfN1rcv/2024-03-06-18-36-57-docx-WPS-Office.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			// ���������� ��������� ���
			return frag;
		}
	};

// ��������
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
    
	// ��������� ����
	Memory.init(cards);


})();