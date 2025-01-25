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
        img: "https://i.postimg.cc/fTjKZCLt/image.png",
        id: 1
    },
    {
        name: "Archimedes' Principle",
        img: "https://i.postimg.cc/htY7qQ9Q/1.png",
        id: 1
      // Same id as Archimedes to match as a pair
    },
    {
        name: "galileo",
        img: "https://i.postimg.cc/N0SsM1Mm/image.png",
        id: 2
      // Same id as Archimedes to match as a pair
    },
    {
        name: "galileo laws",
        img: "https://i.postimg.cc/V5Q0bxk9/1.png",
        id: 2
      // Same id as Archimedes to match as a pair
    },
    {
        name: "gassendi",
        img: "https://i.postimg.cc/TP68HCpk/image.png",
        id: 3
      // Same id as Archimedes to match as a pair
    },
    {
        name: "gassendi laws",
        img: "https://i.postimg.cc/gkZTF391/1.png",
        id: 3
      // Same id as Archimedes to match as a pair
    },
    {
        name: "R.Guk",
        img: "https://i.postimg.cc/nL3Jjqh0/image.png",
        id: 4
      // Same id as Archimedes to match as a pair
    },
    {
        name: "R.Guk laws",
        img: "https://i.postimg.cc/DmVZjHHC/1.png",
        id: 4
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Democrit",
        img: "https://i.postimg.cc/sgrP1Nx9/image.png",
        id: 5
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Democrit laws",
        img: "https://i.postimg.cc/B6XHdW7s/1.png",
        id: 5
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Djouel",
        img: "https://i.postimg.cc/15xwYjGh/image.png",
        id: 6
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Djouel laws",
        img: "https://i.postimg.cc/DzzXXkTs/1.png",
        id: 6
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Lomonosov",
        img: "https://i.postimg.cc/yNS75vht/image.png",
        id: 7
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Lomonosov laws",
        img: "https://i.postimg.cc/RF5vzKXF/1.png",
        id: 7
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Maxsvell",
        img: "https://i.postimg.cc/BbN3DysL/image.png",
        id: 8
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Maxsvell laws",
        img: "https://i.postimg.cc/Sxn42DPR/1.png",
        id: 8
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Pascal",
        img: "https://i.postimg.cc/2SgD4npw/image.png",
        id: 9
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Pascal laws",
        img: "https://i.postimg.cc/Th8VVk9x/1.png",
        id: 9
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Perren",
        img: "https://i.postimg.cc/Qx5PRwvp/image.png",
        id: 10
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Perren laws",
        img: "https://i.postimg.cc/HxRZN92Z/2.png",
        id: 10
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Torrichelli",
        img: "https://i.postimg.cc/Gh0gJz99/image.png",
        id: 11
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Torrichelli laws",
        img: "https://i.postimg.cc/CKHnXhsW/1.png",
        id: 11
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Uatt",
        img: "https://i.postimg.cc/ZKBBZFLP/image.png",
        id: 12
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Uatt laws",
        img: "https://i.postimg.cc/NMZyrKs2/1.png",
        id: 12
      // Same id as Archimedes to match as a pair
    },
    {
        name: "Robert Brown",
        img: "https://i.postimg.cc/8cnTrMkh/image.png",
        id: 13
    },
    {
        name: "Brownian Motion",
        img: "https://i.postimg.cc/LXGnrcLd/1.png",
        id: 13
      // Same id as Robert Brown
    },
    // Add all other scientist and discovery pairs following the same structure
    // Make sure each pair has the same id value
    {
        name: "Isaac Newton",
        img: "https://i.postimg.cc/hjTPJpfT/image.png",
        id: 14
    },
    {
        name: "Newton's Laws",
        img: "https://i.postimg.cc/vHQHB7Mx/1.png",
        id: 14
      // Same id as Isaac Newton
    },
    // Continue adding other pairs
];
    
	// ��������� ����
	Memory.init(cards);


})();