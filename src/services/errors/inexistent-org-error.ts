export class InexistentOrgError extends Error {
  constructor() {
    super('Org não encontrada')
  }
}
