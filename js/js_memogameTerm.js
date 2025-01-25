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
        name: "definition_air",
        img: "img/Card_memogameTerm/definition_air.png",
        id: 1
    },
    {
        name: "term_air",
        img: "img/Card_memogameTerm/term_air.png",
        id: 1
    },
    {
        name: "definition_Archimedean_power",
        img: "img/Card_memogameTerm/definition_Archimedean_power.png",
        id: 2
    },
    {
        name: "term_Archimedean_power",
        img: "img/Card_memogameTerm/term_Archimedean_power.png",
        id: 2
    },
    {
        name: "definition_body_weight",
        img: "img/Card_memogameTerm/definition_body_weight.png",
        id: 3
    },
    {
        name: "term_body_weight",
        img: "img/Card_memogameTerm/term_body_weight.png",
        id: 3
    },
    {
        name: "definition_body_mass",
        img: "img/Card_memogameTerm/definition_body_mass.png",
        id: 4
    },
    {
        name: "term_body_mass",
        img: "img/Card_memogameTerm/term_body_mass.png",
        id: 4
    },
    {
        name: "definition_deformation",
        img: "img/Card_memogameTerm/definition_deformation.png",
        id: 5
    },
    {
        name: "term_deformation",
        img: "img/Card_memogameTerm/term_deformation.png",
        id: 5
    },
    {
        name: "definition_density",
        img: "img/Card_memogameTerm/definition_density.png",
        id: 6
    },
    {
        name: "term_density",
        img: "img/Card_memogameTerm/term_density.png",
        id: 6
    },
    {
        name: "definition_diffusion",
        img: "img/Card_memogameTerm/definition_diffusion.png",
        id: 7
    },
    {
        name: "term_diffusion",
        img: "img/Card_memogameTerm/term_diffusion.png",
        id: 7
    },
    {
        name: "definition_elastic_deformation",
        img: "img/Card_memogameTerm/definition_elastic_deformation.png",
        id: 8
    },
    {
        name: "term_elastic_deformation",
        img: "img/Card_memogameTerm/term_elastic_deformation.png",
        id: 8
    },
    {
        name: "definition_gravitational_forces",
        img: "img/Card_memogameTerm/definition_gravitational_forces.png",
        id: 9
    },
    {
        name: "term_gravitational_forces",
        img: "img/Card_memogameTerm/term_gravitational_forces.png",
        id: 9
    },
    {
        name: "definition_inertia",
        img: "img/Card_memogameTerm/definition_inertia.png",
        id: 11
    },
    {
        name: "term_inertia",
        img: "img/Card_memogameTerm/term_inertia.png",
        id: 11
    },
    {
        name: "definition_kinetic_energy",
        img: "img/Card_memogameTerm/definition_kinetic_energy.png",
        id: 12
    },
    {
        name: "term_kinetic_energy",
        img: "img/Card_memogameTerm/term_kinetic_energy.png",
        id: 12
    },
    {
        name: "definition_lever",
        img: "img/Card_memogameTerm/definition_lever.png",
        id: 13
    },
    {
        name: "term_lever",
        img: "img/Card_memogameTerm/term_lever.png",
        id: 13
    },
    {
        name: "definition_liquid",
        img: "img/Card_memogameTerm/definition_liquid.png",
        id: 14
    },
    {
        name: "term_liquid",
        img: "img/Card_memogameTerm/term_liquid.png",
        id: 14
    },
    {
        name: "definition_mechanical_movement",
        img: "img/Card_memogameTerm/definition_mechanical_movement.png",
        id: 15
    },
    {
        name: "term_mechanical_movement",
        img: "img/Card_memogameTerm/term_mechanical_movement.png",
        id: 15
    },
    {
        name: "definition_plastic_deformation",
        img: "img/Card_memogameTerm/definition_plastic_deformation.png",
        id: 16
    },
    {
        name: "term_plastic_deformation",
        img: "img/Card_memogameTerm/term_plastic_deformation.png",
        id: 16
    },
    {
        name: "definition_potential_energy",
        img: "img/Card_memogameTerm/definition_potential_energy.png",
        id: 17
    },
    {
        name: "term_potential_energy",
        img: "img/Card_memogameTerm/term_potential_energy.png",
        id: 17
    },
    {
        name: "definition_power",
        img: "img/Card_memogameTerm/definition_power.png",
        id: 18
    },
    {
        name: "term_power",
        img: "img/Card_memogameTerm/term_power.png",
        id: 18
    },
    {
        name: "definition_scalar_value",
        img: "img/Card_memogameTerm/definition_scalar_value.png",
        id: 19
    },
    {
        name: "term_scalar_value",
        img: "img/Card_memogameTerm/term_scalar_value.png",
        id: 19
    },
    {
        name: "definition_solid_body",
        img: "img/Card_memogameTerm/definition_solid_body.png",
        id: 20
    },
    {
        name: "term_solid_body",
        img: "img/Card_memogameTerm/term_solid_body.png",
        id: 20
    },
    {
        name: "definition_speed",
        img: "img/Card_memogameTerm/definition_speed.png",
        id: 21
    },
    {
        name: "term_speed",
        img: "img/Card_memogameTerm/term_speed.png",
        id: 21
    },
    {
        name: "definition_speedup",
        img: "img/Card_memogameTerm/definition_speedup.png",
        id: 22
    },
    {
        name: "term_speedup",
        img: "img/Card_memogameTerm/term_speedup.png",
        id: 22
    },
    {
        name: "definition_stable_equilibrium",
        img: "img/Card_memogameTerm/definition_stable_equilibrium.png",
        id: 23
    },
    {
        name: "term_stable_equilibrium",
        img: "img/Card_memogameTerm/term_stable_equilibrium.png",
        id: 23
    },
    {
        name: "definition_The_golden_rule_of_mechanics",
        img: "img/Card_memogameTerm/definition_The_golden_rule_of_mechanics.png",
        id: 24
    },
    {
        name: "term_The_golden_rule_of_mechanics",
        img: "img/Card_memogameTerm/term_The_golden_rule_of_mechanics.png",
        id: 24
    },
    {
        name: "definition_the_trajectory_of_movement",
        img: "img/Card_memogameTerm/definition_the_trajectory_of_movement.png",
        id: 25
    },
    {
        name: "term_the_trajectory_of_movement",
        img: "img/Card_memogameTerm/term_the_trajectory_of_movement.png",
        id: 25
    },
    {
        name: "definition_uneven_movement",
        img: "img/Card_memogameTerm/definition_uneven_movement.png",
        id: 26
    },
    {
        name: "term_uneven_movement",
        img: "img/Card_memogameTerm/term_uneven_movement.png",
        id: 26
    },
    {
        name: "definition_wetting",
        img: "img/Card_memogameTerm/definition_wetting.png",
        id: 27
    },
    {
        name: "term_wetting",
        img: "img/Card_memogameTerm/term_wetting.png",
        id: 27
    },
    {
        name: "definition_vector_value",
        img: "img/Card_memogameTerm/definition_vector_value.png",
        id: 28
    },
    {
        name: "term_vector_value",
        img: "img/Card_memogameTerm/term_vector_value.png",
        id: 28
    },
    {
        name: "definition_unstable_balance",
        img: "img/Card_memogameTerm/definition_unstable_balance.png",
        id: 29
    },
    {
        name: "term_unstable_balance",
        img: "img/Card_memogameTerm/term_unstable_balance.png",
        id: 29
    },
    {
        name: "definition_the_strength_of_elasticity",
        img: "img/Card_memogameTerm/definition_the_strength_of_elasticity.png",
        id: 30
    },
    {
        name: "term_the_strength_of_elasticity",
        img: "img/Card_memogameTerm/term_the_strength_of_elasticity.png",
        id: 30
    }
];
    
	// ��������� ����
	Memory.init(cards);


})();