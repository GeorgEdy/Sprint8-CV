var app = angular.module('sprint8App');

app.factory('StorageService', function () {
  var data = [];
  var currentDocIndex = 0;
  var localStorageData = localStorage.getItem('data');

  var createDocument = function () {
    var newDocument = angular.copy(emptyData);
    data.push(newDocument);
  };

  var deleteDocument = function (index) {
    data.splice(index, 1);
  };
  var getInitialStorage = function () {
    if (localStorageData === null) {
      data.push(initialData);
      cleanDates();
      localStorage.setItem('data', JSON.stringify(data));
      console.log('LocalStorage is Empty');
    }
    else {
      data = JSON.parse(localStorageData);
      cleanDates();
    }
  };

  var cleanDates = function () {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].workingExperience; j++) {
        data[i].workingExperience[j].dateStart = new Date(data[i].workingExperience[j].dateStart);
        data[i].workingExperience[j].dateEnd = new Date(data[i].workingExperience[j].dateEnd);
      }
      for (var k = 0; k < data[i].education; k++) {
        data[i].education[k].dateStart = new Date(data[i].education[k].dateStart);
        data[i].education[k].dateEnd = new Date(data[i].education[k].dateEnd);
      }
    }
  };

  window.onbeforeunload = function () {
    cleanDates();
    localStorage.setItem('data', JSON.stringify(data));
    console.log('unload');
    return null;
  };

  $(window).on('keypress', function (event) {
    console.log(event.keyCode);
    if (event.keyCode === 68) {
      window.onbeforeunload = null;
      localStorage.clear('data');
      data = [];
      location.reload();

    }
  });

  var initialData = {
    cvName: 'First CV',
    personalDetails: {
      name: 'Gogu Caldararu',
      currPos: '',
      aboutMe: 'Je suis smecher',
      phoneNumber: '',
      address: 'Cucuietii din deal',
      email: '',
      website: '',
      skype: '',
      linkedin: '',
      "pictureSrc": "data:image/jpeg;base64,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"
    },

    workingExperience: [
      {
        position: 'Junior Programmer',
        company: 'Umbrella Corporation',
        description: 'Programming killer software',
        dateStart: new Date(2017, 10, 10),
        dateEnd: new Date(2009, 10, 10),
        toPresent: false
      },
      {
        position: 'Manager Assistant',
        company: 'Red Box',
        description: 'No ideea what I am doing here',
        dateStart: new Date(2009, 10, 10),
        dateEnd: new Date(2013, 10, 10),
        toPresent: false
      }
    ],
    education: [
      {
        degree: 'BAC',
        school: 'Numaru 9',
        description: 'best school ever',
        dateStart: new Date(2004, 10, 10),
        dateEnd: new Date(2006, 10, 10),
        toPresent: false
      }
    ],
    languages: [
      {
        name: 'english',
        understanding: 'C1',
        speaking: 'B2',
        writing: 'B2'
      }
    ],
    skills: 'smecherie'
  };
  var initialData2 = {
    cvName: 'Second CV',
    personalDetails: {
      name: 'Ilie Moromete',
      currPos: '',
      aboutMe: 'Je suis smecher',
      phoneNumber: '',
      address: 'Cucuietii din deal',
      email: '',
      website: '',
      skype: '',
      linkedin: ''
    },

    workingExperience: [
      {
        position: 'Junior Programmer',
        company: 'Umbrella Corporation',
        description: 'Programming killer software',
        dateStart: new Date(2017, 10, 10),
        dateEnd: new Date(2009, 10, 10),
        toPresent: false
      },
      {
        position: 'Manager Assistant',
        company: 'Red Box',
        description: 'No ideea what I am doing here',
        dateStart: new Date(2009, 10, 10),
        dateEnd: new Date(2013, 10, 10),
        toPresent: false
      }
    ],
    education: [
      {
        degree: 'BAC',
        school: 'Numaru 9',
        description: 'best school ever',
        dateStart: new Date(2004, 10, 10),
        dateEnd: new Date(2006, 10, 10),
        toPresent: false
      }
    ],
    languages: [
      {
        name: 'english',
        understanding: 'C1',
        speaking: 'B2',
        writing: 'B2'
      }
    ],
    skills: 'smecherie'
  };
  var emptyData = {
    cvName: 'Untitled CV',
    personalDetails: {
      name: '',
      currPos: '',
      aboutMe: '',
      phoneNumber: '',
      address: '',
      email: '',
      website: '',
      skype: '',
      linkedin: ''
    },

    workingExperience: [
      {
        position: '',
        company: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        toPresent: false
      },
      {
        position: '',
        company: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        toPresent: false
      }
    ],
    education: [
      {
        degree: '',
        school: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        toPresent: false
      }
    ],
    languages: [
      {
        name: '',
        understanding: '',
        speaking: '',
        writing: ''
      }
    ],
    skills: ''
  };

  getInitialStorage();

  return {
    data: data,
    currentDocIndex: currentDocIndex,
    createDocument: createDocument,
    deleteDocument: deleteDocument
  }
});
