const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    //arrange
    const body = getBodyFromRequest(fakeReq);
    //act
    fakeReq.emit("end");
    //assert
    body
    .then(body => {
     if(body === ''){
        done();
     } else{
       done("failed, body isn't empty")
     }
    });
  });

  it('returns the data read from the stream', done => {
    const body = getBodyFromRequest(fakeReq);
    const contentOfBody = 'DATAAAAAAAAAAAAAAAA';
    console.log(body);
    //act
    fakeReq.emit("data",contentOfBody);
    fakeReq.emit("end");
    console.log(body);
    //assert

    body
    .then(body => {
      if(body === contentOfBody){
      done();
   } else{
     done("failed, body is empty")
   }
  });
  });
});
