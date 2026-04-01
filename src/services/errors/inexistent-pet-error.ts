export class InexistentPetError extends Error {
  constructor() {
    super('Pet não encontrado')
  }
}
