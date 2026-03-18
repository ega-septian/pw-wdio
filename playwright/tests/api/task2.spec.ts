import { test, expect } from '@playwright/test';
import addPetPayload from './payloads/addPet.json';
import { DeletePetResponse, FindByStatusResponse, Pet } from './schemas/pet.types';

const BASE_URL = process.env.BASE_URL 

test.describe('Petstore - Add Pet', () => {
  test('addPet with valid payload returns 200 and response has all contract keys and matching values',
    { tag: ["@API-001", "@petstore", "@addPet"] }, async ({ request }) => {
    const res = await request.post(`${BASE_URL}/pet`, {
      data: addPetPayload,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('category');
    expect(body.category).toHaveProperty('id');
    expect(body.category).toHaveProperty('name');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('photoUrls');
    expect(body).toHaveProperty('tags');
    expect(body).toHaveProperty('status');

    expect(body.category.id).toBe(addPetPayload.category.id);
    expect(body.category.name).toBe(addPetPayload.category.name);
    expect(body.name).toBe(addPetPayload.name);
    expect(body.photoUrls).toEqual(addPetPayload.photoUrls);
    expect(body.tags).toHaveLength(1);
    expect(body.tags[0].id).toBe(addPetPayload.tags[0].id);
    expect(body.tags[0].name).toBe(addPetPayload.tags[0].name);
    expect(body.status).toBe(addPetPayload.status);
  });

  test('addPet with invalid status returns 400',
    { tag: ["@API-002", "@petstore", "@addPet"] }, async ({ request }) => {
    const invalidPayload = { ...addPetPayload, status: 'invalid_status' };
    const res = await request.post(`${BASE_URL}/pet`, {
      data: invalidPayload,
    });

    expect(res.status()).toBe(400);
  });

  test('findByStatus with status=pending, available returns 200 and array of pending and available pets',
    { tag: ["@API-003", "@petstore", "@findByStatus"] }, async ({request }) => {
    const res = await request.get(`${process.env.BASE_URL}/pet/findByStatus?status=pending, available`);

    expect(res.status()).toBe(200);
    const body = (await res.json()) as FindByStatusResponse;
    expect(Array.isArray(body)).toBe(true);
    expect(body.every((pet: Pet) => pet.status === 'pending' || pet.status === 'available')).toBe(true);
  });

  test('findByStatus with status=123 returns 400',
    { tag: ["@API-004", "@petstore", "@findByStatus"] }, async ({ request }) => {
    const res = await request.get(`${process.env.BASE_URL}/pet/findByStatus?status=123`);

    expect(res.status()).toBe(400);
  });

  test('deletePet by id returns 200 and response message contains deleted pet id',
    { tag: ["@API-005", "@petstore", "@deletePet"] }, async ({
    request,
  }) => {
    const res = await request.delete(`${BASE_URL}/pet/9223372036854775807`);
    expect(res.status()).toBe(200);

    const body = (await res.json()) as DeletePetResponse;
    expect(body.message).toBe('9223372036854775807');
  });
});
