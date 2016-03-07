var app = angular.module('sprint8App');

app.factory('StorageService', function () {
  "use strict";
  var data = [];
  var currentDocIndex = 0;

  var createDocument = function () {
    var newDocument = angular.copy(emptyData);
    data.push(newDocument);
  };

  var deleteDocument = function (index) {
    data.splice(index, 1);
  };

  var addDocumentIfNoneExists = function () {
    if (!data.length) {
      createDocument();
      currentDocIndex = 0;
    }
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
    }
    ;

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

  data.push(initialData);
  data.push(initialData2);
  return {
    data: data,
    currentDocIndex: currentDocIndex,
    createDocument: createDocument,
    deleteDocument: deleteDocument
  };
});
