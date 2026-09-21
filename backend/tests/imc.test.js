const request = require('supertest');
const app = require('../server');

describe('API IMC', () => {
  
  test('Calcule un IMC normal (70kg, 1.75m)', async () => {
    const reponse = await request(app)
      .post('/api/imc')
      .send({ poids: 70, taille: 1.75 });
    
    expect(reponse.statusCode).toBe(200);
    expect(reponse.body.imc).toBe(22.86);
    expect(reponse.body.categorie).toBe('Normal');
  });

  test('Détecte un surpoids (90kg, 1.75m)', async () => {
    const reponse = await request(app)
      .post('/api/imc')
      .send({ poids: 90, taille: 1.75 });
    
    expect(reponse.body.categorie).toBe('Surpoids');
  });

  test('Refuse des valeurs invalides', async () => {
    const reponse = await request(app)
      .post('/api/imc')
      .send({ poids: -5, taille: 1.75 });
    
    expect(reponse.statusCode).toBe(400);
  });

  test('Le healthcheck répond OK', async () => {
    const reponse = await request(app).get('/health');
    expect(reponse.statusCode).toBe(200);
    expect(reponse.body.status).toBe('ok');
  });

});
