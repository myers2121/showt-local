$(document).ready(function() {
  var HuntingViewModel = function() {

    var self = this;

    self.hunt_type = ko.observable("");
    self.locations = ko.observable("");
    self.hunt_description = ko.observable("");
    self.locationFrameSRC = ko.observable("");

    self.huntItemClicked = function(huntingType) {
      self.hunt_type(huntingType.animalName);
      self.hunt_description(huntingType.longDescription);
      $('.hunt-type-popup').fadeIn();
      $('body').css('overflow','hidden');
    }

    self.locationClicked = function(huntingType) {
      self.hunt_type(huntingType.animalName);
      self.locations(huntingType.locations);
      $('.hunt-location-popup').fadeIn();
      $('body').css('overflow','hidden');
    }

    self.locationSelected = function(location) {
      self.locationFrameSRC(location.frame);
      $('.frame-container').fadeIn();
    }

    self.huntingTypes = [
      {
        animalName: 'Deer',
        timeOfYear: 'Spring',
        imageURL: '/static/img/deer-white.png',
        longDescription: 'Lorem ipsum dolor sit amet, duo an esse erroribus rationibus, ea augue ignota tibique sea. Ex legendos intellegam sed, eu erat appareat ocurreret vix, essent scripserit cu qui. Modo quot quaestio cum te. Cum purto erant scriptorem at.Vis et suavitate moderatius reprimique. Nec ad facilisis eloquentiam vituperatoribus. Saperet iracundia comprehensam duo at, ex laudem suscipit persecuti usu. At qui oratio oporteat hendrerit, ex velit causae praesent est, in qui postulant dignissim. Sumo veritus mel et, aeque sonet quaerendum nec ad.',
        locations: [
          {
            city: 'Fresno',
            state: 'California',
            zipcode: '93726',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204504.2867585118!2d-119.93499130567622!3d36.78545091603865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945de1549e4e9d%3A0x7b12406449a3b811!2sFresno%2C+CA!5e0!3m2!1sen!2sus!4v1455751761765'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93619',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93611',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          }
        ]
      },
      {
        animalName: 'Pig',
        timeOfYear: 'Summer',
        imageURL: '/static/img/pig-white.png',
        longDescription: 'Lorem ipsum dolor sit amet, duo an esse erroribus rationibus, ea augue ignota tibique sea. Ex legendos intellegam sed, eu erat appareat ocurreret vix, essent scripserit cu qui. Modo quot quaestio cum te. Cum purto erant scriptorem at.Vis et suavitate moderatius reprimique. Nec ad facilisis eloquentiam vituperatoribus. Saperet iracundia comprehensam duo at, ex laudem suscipit persecuti usu. At qui oratio oporteat hendrerit, ex velit causae praesent est, in qui postulant dignissim. Sumo veritus mel et, aeque sonet quaerendum nec ad.',
        locations: [
          {
            city: 'Fresno',
            state: 'California',
            zipcode: '93726',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204504.2867585118!2d-119.93499130567622!3d36.78545091603865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945de1549e4e9d%3A0x7b12406449a3b811!2sFresno%2C+CA!5e0!3m2!1sen!2sus!4v1455751761765'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93619',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93611',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          }
        ]
      },
      {
        animalName: 'Waterfowl',
        timeOfYear: 'Fall',
        imageURL: '/static/img/duck-white.png',
        longDescription: 'Lorem ipsum dolor sit amet, duo an esse erroribus rationibus, ea augue ignota tibique sea. Ex legendos intellegam sed, eu erat appareat ocurreret vix, essent scripserit cu qui. Modo quot quaestio cum te. Cum purto erant scriptorem at.Vis et suavitate moderatius reprimique. Nec ad facilisis eloquentiam vituperatoribus. Saperet iracundia comprehensam duo at, ex laudem suscipit persecuti usu. At qui oratio oporteat hendrerit, ex velit causae praesent est, in qui postulant dignissim. Sumo veritus mel et, aeque sonet quaerendum nec ad.',
        locations: [
          {
            city: 'Fresno',
            state: 'California',
            zipcode: '93726',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204504.2867585118!2d-119.93499130567622!3d36.78545091603865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945de1549e4e9d%3A0x7b12406449a3b811!2sFresno%2C+CA!5e0!3m2!1sen!2sus!4v1455751761765'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93619',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93611',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          }
        ]
      },
      {
        animalName: 'Bear',
        timeOfYear: 'Winter',
        imageURL: '/static/img/bear-white.png',
        longDescription: 'Lorem ipsum dolor sit amet, duo an esse erroribus rationibus, ea augue ignota tibique sea. Ex legendos intellegam sed, eu erat appareat ocurreret vix, essent scripserit cu qui. Modo quot quaestio cum te. Cum purto erant scriptorem at.Vis et suavitate moderatius reprimique. Nec ad facilisis eloquentiam vituperatoribus. Saperet iracundia comprehensam duo at, ex laudem suscipit persecuti usu. At qui oratio oporteat hendrerit, ex velit causae praesent est, in qui postulant dignissim. Sumo veritus mel et, aeque sonet quaerendum nec ad.',
        locations: [
          {
            city: 'Fresno',
            state: 'California',
            zipcode: '93726',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204504.2867585118!2d-119.93499130567622!3d36.78545091603865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945de1549e4e9d%3A0x7b12406449a3b811!2sFresno%2C+CA!5e0!3m2!1sen!2sus!4v1455751761765'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93619',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          },
          {
            city: 'Clovis',
            state: 'California',
            zipcode: '93611',
            frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5489719692314!2d-119.73515304962442!3d36.80536297984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945c50ce9ced1b%3A0xb33f6498269cbbbb!2s4819+N+Winery+Cir%2C+Fresno%2C+CA+93726!5e0!3m2!1sen!2sus!4v1455752860689'
          }
        ]
      }
    ]
  };

  var huntingObjectVm = new HuntingViewModel();
  ko.applyBindings(huntingObjectVm,$("#hunting")[0]);

  $('.exit-person-expanded-hunt').click(function() {
    $('.hunt-type-popup').fadeOut();
    $('body').css('overflow','auto');
  });

  $('.exit-location-expanded-frame').click(function() {
    $('.frame-container').fadeOut();
  });

  $('.exit-location-expanded-hunt').click(function() {
    $('.hunt-location-popup').fadeOut();
    $('body').css('overflow','auto');
  });

});
