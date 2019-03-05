'use strict';

const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /apps endpoint', () => {
  it('should make a get request that returns a 200 response, and an array of objects', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price',
          'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
        );
      });
  });
});

describe('sort query', () => {
  it('should sort apps', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'app'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i] < res.body[i + 1];
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort rating', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'app' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        
      });
  });
});
