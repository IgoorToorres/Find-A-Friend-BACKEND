export class OrgAlredyExists extends Error {
  constructor() {
    super('Email ja cadastrado.')
  }
}
