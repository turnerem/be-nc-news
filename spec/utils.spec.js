const { expect } = require('chai');
const sinon = require('sinon');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('should return an array of objects', () => {
    const input = [
      {created_at: 1542284514171, name: 'jelly'}, 
      {created_at: 15422845141, name: 'swordfish'}];
    expect(formatDates(input)).to.be.an('array')
  })
  it('should return formatted date', () => {
    const input = [
      {created_at: 1542284514171, name: 'jelly'}, 
      {created_at: 15422845141, name: 'swordfish'}];
    const actual = formatDates(input);
    
    expect(actual[0].created_at).to.be.an.instanceof(Date)
  })
  it('should have all the original keys', () => {
    const input = [
      {created_at: 1542284514171, name: 'jelly'}, 
      {created_at: 15422845141, name: 'swordfish'}];
    expect(formatDates(input)[0]).to.have.keys('created_at', 'name')
  })
});

describe('makeRefObj', () => {
  it('should return expected object', () => {
    const input = [{ article_id: 1, title: 'A' }];
    const actual = makeRefObj(input);
    const expected = { A: 1 };
    expect(actual).to.deep.equal(expected);
  })
  it('should complain if either key of value fields are missing', () => {
    const input = [{ particle_id: 1, title: 'A' }];  
    const spy = sinon.spy(console, 'log')
    makeRefObj(input);
    console.log.restore();
    expect(spy.args[0][0]).to.equal('missing proper keys or values')
  });
});

describe('formatComments', () => {
  it('should replace belongs_to key with article_id', () => {
    const comment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const refObj = { "They're not exactly dogs, are they?": 1}
    const actual = formatComments(comment, refObj);
    expect(actual[0]).to.not.have.key('belongs_to')
    expect(actual[0]).to.have.keys('article_id', 'body', 'created_by', 'votes', 'created_at')
  })
  it('should complain if any object in the array is missing belongs_to', () => {
    const comment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      pelongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const refObj = { "They're not exactly dogs, are they?": 1}
    const spy = sinon.spy(console, 'log')
    formatComments(comment, refObj);
    console.log.restore();
    expect(spy.args[0][0]).to.equal('missing belongs_to key')
   

  })
});
