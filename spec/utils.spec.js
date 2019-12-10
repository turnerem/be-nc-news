const { expect } = require('chai');
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
    console.log(actual, 'actual in spec')
    expect(actual[0].created_at).to.be.an.instanceof(Date)
  })
  it('should have all the original keys', () => {
    const input = [
      {created_at: 1542284514171, name: 'jelly'}, 
      {created_at: 15422845141, name: 'swordfish'}];
    expect(formatDates(input)[0]).to.have.keys('created_at', 'name')
  })
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
