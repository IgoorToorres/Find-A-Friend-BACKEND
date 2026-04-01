import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByFiltersService } from '../pets/fetch-pets-by-filters.service'

export function makeFetchPetsByFilters() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetsByFilters = new FetchPetsByFiltersService(petRepository)

  return fetchPetsByFilters
}
