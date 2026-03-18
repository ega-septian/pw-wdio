/**
 * TypeScript types for Petstore API responses.
 * Sesuai contract Pet (addPet, findByStatus, getPetById, dll).
 */

export interface PetCategory {
  id: number;
  name: string;
}

export interface PetTag {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  category?: PetCategory;
  name?: string;
  photoUrls: string[];
  tags: PetTag[];
  status: 'available' | 'pending' | 'sold';
}

/** Response GET /pet/findByStatus */
export type FindByStatusResponse = Pet[];

/** Response DELETE /pet/{petId} */
export interface DeletePetResponse {
  code: number;
  type: string;
  message: string;
}
