var app = angular.module('sprint8App');

app.factory('StorageService', function () {
  "use strict";
  var historyDataIndex;
  var data = [];
  var lastData = [];
  var historyQueueOriginal = [];
  var historyQueueChanged = [];
  var currentDocIndex = 0;
  var localStorageData = localStorage.getItem('data');
  var createDocument = function () {
    var newDocument = angular.copy(emptyData);
    data.push(newDocument);
    lastData.push(newDocument);
  };

  var deleteDocument = function (index) {
    data.splice(index, 1);
    lastData = angular.copy(data);
  };


  var initialise = function () {
    if (localStorageData === null) {
      data.push(initialData);
      lastData = angular.copy(data);
      historyQueueOriginal.push([]);
      historyQueueChanged.push([]);
      localStorage.setItem('data', JSON.stringify(data));
      historyDataIndex = historyQueueOriginal.length - 1;
      console.log('LocalStorage is Empty');
    }
    else {
      data = JSON.parse(localStorageData);
      lastData = angular.copy(data);
      for (var i = 0; i < data.length; i++) {
        historyQueueOriginal.push([]);
        historyQueueChanged.push([]);
      }
      historyDataIndex = historyQueueOriginal.length - 1;
      console.log('LocalStorage has Data');
    }
  };

  var initialiseHistory = function (index) {

    initialiseHistorySection(index, 'workingExperience');
    initialiseHistorySection(index, 'education');
    initialiseHistorySection(index, 'languages');
    initialiseHistorySection(index, 'skills');
    initialiseHistorySection(index, 'personalDetails');
    //initialiseHistorySection(index,'cvName');
    console.log('History Initialised');
    historyDataIndex = historyQueueOriginal[index].length - 1;
    //console.log(historyQueueOriginal[index]);

  };

  var initialiseHistorySection = function (index, section) {
    var historyObject = {
      data: '', //angular.copy might be redundant
      timestamp: moment(),
      section: ''
    };
    historyObject.section = section;
    historyObject.data = objectPath.get(data[index], section);
    historyQueueOriginal[index].push(angular.copy(historyObject));
    historyQueueChanged[index].push(angular.copy(historyObject));
  };

  var cleanDates = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      for (var j = 0; j < dataArray[i].workingExperience; j++) {
        console.log(dataArray[i].workingExperience[j].dateStart);
        dataArray[i].workingExperience[j].dateStart = new Date(dataArray[i].workingExperience[j].dateStart);
        dataArray[i].workingExperience[j].dateEnd = new Date(dataArray[i].workingExperience[j].dateEnd);
      }
      for (var k = 0; k < dataArray[i].education; k++) {
        console.log(dataArray[i].education[k].dateStart);
        dataArray[i].education[k].dateStart = new Date(dataArray[i].education[k].dateStart);
        dataArray[i].education[k].dateEnd = new Date(dataArray[i].education[k].dateEnd);
      }
    }
  };

  window.onbeforeunload = function () {
    //cleanDates(data);
    localStorage.setItem('data', JSON.stringify(data));
    console.log('unload');
    return null;
  };

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
      "pictureSrc": "https://pbs.twimg.com/profile_images/458590883907379200/ZEEFRp2F.jpeg"
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
        description: 'No idea what I am doing here',
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
      linkedin: '',
      pictureSrc: ''
    },

    workingExperience: [
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

  initialise();

  return {
    data: data,
    currentDocIndex: currentDocIndex,
    historyDataIndex: historyDataIndex,
    initialiseHistory: initialiseHistory,
    historyQueueOriginal: historyQueueOriginal,
    historyQueueChanged: historyQueueChanged,
    lastData: lastData,
    createDocument: createDocument,
    deleteDocument: deleteDocument
  };
});
