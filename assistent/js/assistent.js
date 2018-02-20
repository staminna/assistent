(function ($) {

	if (annyang) {
		  // Let's define our first command. First the text we expect, and then the function it should call

		//annyang.setLanguage('pt-PT');
		SpeechKITT.annyang();
		SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.1.0/themes/flat.css');
		SpeechKITT.vroom();
		SpeechKITT.setStartCommand(annyang.start);

		var neededData;

		$.getJSON('https://www.annyang.io/apikeys',function(jsonData){
			neededData = jsonData;
			console.log('neededData' + neededData);
		});

		var showFlickr = function(term) {
        var searchTerm = term;
        var Flickurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + neededData.data[0][1];
        var tags = "&tags=" + searchTerm;
        var tagmode = "&tagmode=any";
        var jsonFormat = "&format=json&nojsoncallback=1";
        var FinalURL = Flickurl + tags + tagmode + jsonFormat;

         $.getJSON(FinalURL, function(photos) {

           for (var i = 0; i < 12; i++) {
             var photo = photos.photos.photo[i];
             console.log(photo);

             var photoUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";

             $('images').append('<img src="' + photoUrl + '"/>');
             $( "<img>" ).attr( "src", photoUrl).appendTo( "#images" );
           }
        });
      }

			var thankyou = function(){
				speak('You\'re welcome');
			}

			function greetFunction (username) {
				speak('Hey' + username + 'how are you');
			}

			var remindMe = function(what) {

				speak('Where is the location?');
				document.getElementById('authorize-button').click();
				//$('#stats').text('Statistics for '+month);
			}

			var whatday = function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
				var hour = today.getHours();
				var minutes = today.getMinutes();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }
				if (minutes<10) {
					minutes='0'+minutes
				}

        today = dd+'/'+mm+'/'+yyyy;
				msg.text = today;

				speak(mm+'/'+dd+'/'+yyyy);
				speak('Its' + hour + 'hours and' + minutes + 'minutes');

				$('#images').append('<h2>' + today + '</h2>');
				$('#images').append('<h3>It\'s ' + hour + ':' + minutes + '</h3>');


			}

      var refresh = function() {
        //drupal_flush_all_caches(); // PHP.. needs work or very difficult
				msg.text = 'Refreshing';
				speechSynthesis.speak(msg);

        location.reload();
      }

			var google = function(term) {
	      element.execute(term);
			}

			var sayThis = function(result) {
				$("#images").text(result);
				speak(result);
			}

		var commands = {
		    'show tps report': function() {
		      $('#images').animate({bottom: '-100px'});
		    },

						'hello :name': {'regexp': /^(?:hello|howdy|hi|hey) (\w*)$/, 'callback': greetFunction},
						// annyang will capture anything after a splat (*) and pass it to the function.
					  // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
					  'flickr *term': showFlickr,
						'google *term': google,
					  // A named variable is a one word variable, that can fit anywhere in your command.
					  // e.g. saying "calculate October stats" will call calculateStats('October');
					  'remind me to :subject': remindMe,
						'say *something': sayThis,
					  // By defining a part of the following command as optional, annyang will respond to both:
					  // "say hello to my little friend" as well as "say hello friend"
			      'date *when':{'regexp': /^date (?:today|tomorrow|time)$/, 'callback':whatday},
						'what time is it':whatday,

						'thank you': thankyou,
            'refresh': refresh

		};

		  // Add our commands to annyang
		  annyang.addCommands(commands);

		  annyang.debug();
		  // Start listening. You can call this here, or attach this call to an event, button, etc.
		  annyang.start();

		}


})(jQuery);

jQuery(document).ready(function($){
	var template = twig({
	    data: 'This is how to pass data from javascript to twig {{ baked_good }}.'
	});

$('#images').append('<h2>' + template.render({baked_good: 'annyang'}) + '</h2>');

});
