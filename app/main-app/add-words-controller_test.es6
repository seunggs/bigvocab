/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

/*
	WHAT TO TEST:
	- can the user add things? add to DB + Success msg?
	- are the definitions call being made on tab? is it getting displayed?
	- is anything breaking if input is undefined or wrong?
	- is error handling working properly
 */


describe('AddWordsCtrl', () => {
  let ctrl,
			ConfigService,
			DictionaryService,
			WordsService,
			TextConvertService,
			promiseSuccess;

  beforeEach(module('mainApp'));

  // mock services
  beforeEach(() => {
  	let mockConfigService = {},
  			mockDictionaryService = {},
  			mockWordsService = {},
  			mockTextConvertService = {};

  	module('mainApp', $provide => {
  		$provide.value('ConfigService', mockConfigService);
  		$provide.value('DictionaryService', mockDictionaryService);
  		$provide.value('WordsService', mockWordsService);
  		$provide.value('TextConvertService', mockTextConvertService);
  	});

  	inject($q => {
  		let mockData = [
				{
					'collectionId':  '0b86de30-c470-4de7-8c39-e06e04a64bcd' ,
					'definition': 'Disintegration of cells into membrane-bound particles that are then eliminated by phagocytosis or by shedding.' ,
					'easeFactor': 1.6999999999999997 ,
					'id':  'aace4fbf-c6fb-4be3-981a-b1c5b11e7f99' ,
					'interval': 5760 ,
					'lastReviewedEpochTime': 1439429722 ,
					'nextReviewEpochTime': 1439775322 ,
					'phase':  'review' ,
					'pronunciations': [
						'http://media.merriam-webster.com/soundc11/a/apopt02s.wav'
					] ,
					'reviewRes': {
					'again': 4 ,
					'easy': 0 ,
					'good': 2 ,
					'hard': 0
					} ,
					'word':  'apoptosis'
				}
  		];

  		mockConfigService.mashapeKey = 'somesecretkey';

  		mockDictionaryService.getDefinitionFree = (mashapeKey, wordStr) => {
  			if (mashapeKey === 'somesecretkey' && promiseSuccess) {
  				return $q.when(['definition1', 'definition2', 'definition3']);
  			} else {
  				return $q.reject('Error');
  			}
  		};

  		mockTextConvertService.toHtml = text => {
  			if (text === undefined) { return ''; }
  			return text;
  		};

  		mockWordsService.create = wordObj => {
  			if (promiseSuccess) {
  				mockData.push(wordObj);
  				return $q.when('Success');
  			} else {
  				return $q.reject('Error');
  			}
  		};

  		mockWordsService.exists = (collectionId, wordStr) => {
				let wordsFound = mockData.filter(word => {
					return word.collectionId === collectionId && word.word === wordStr;
				});

  			if (promiseSuccess) {
  				if (wordsFound.length > 0) {
  					return $q.when(true);
  				} else {
  					return $q.when(false);
  				}
  			} else {
  				return $q.reject('Error');
  			}		
  		};

  		mockWordsService.find = (collectionId, wordStr) => {
				let wordsFound = mockData.filter(word => {
					return word.collectionId === collectionId && word.word === wordStr;
				});

  			if (promiseSuccess && wordsFound.length > 0) {
  				return $q.when(wordsFound);
  			} else {
  				return $q.reject('Error');
  			}
  		};

  		mockWordsService.update = (wordId, wordUpdate) => {
				let wordsFound = mockData.filter(word => {
					return word.id === wordId;
				});

  			if (promiseSuccess) {
  				if (wordsFound.length > 0) {
  					let wordIndex = mockData.indexOf(wordsFound[0]); // erase this index and add wordUpdate
  					if (wordIndex !== -1) { 
  						mockData[wordIndex] = wordUpdate;
  					}

  					$q.when('Success');
  				} else {
  					$q.when('Skipped');
  				}
  			} else {
  				return $q.reject('Error');
  			}
  		};

  	});
  });

  beforeEach(inject(($rootScope, $controller, _ConfigService_, _DictionaryService_, _WordsService_, _TextConvertService_) => {
  	ConfigService = _ConfigService_;
  	DictionaryService = _DictionaryService_;
  	WordsService = _WordsService_;
  	TextConvertService = _TextConvertService_;

    ctrl = $controller('AddWordsCtrl', {
    	ConfigService: ConfigService, 
    	DictionaryService: DictionaryService, 
    	WordsService: WordsService,
    	TextConvertService: TextConvertService
   	});
  }));

  it('should have ctrlName as AddWordsCtrl', () => {
    expect(ctrl.ctrlName).toEqual('AddWordsCtrl');
  });
});
