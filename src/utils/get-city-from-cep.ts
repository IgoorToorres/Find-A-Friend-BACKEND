export class InvalidCepError extends Error {
  constructor() {
    super('Invalid CEP')
  }
}

export class CepNotFoundError extends Error {
  constructor() {
    super('CEP not found')
  }
}

type ViaCepResponse = {
  localidade?: string
  erro?: boolean
}

export async function getCityFromCep(rawCep: string): Promise<string> {
  const cep = rawCep.replace(/\D/g, '')

  if (cep.length !== 8) {
    throw new InvalidCepError()
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  if (!response.ok) {
    throw new CepNotFoundError()
  }

  const data: ViaCepResponse = await response.json()

  if (data.erro || !data.localidade) {
    throw new CepNotFoundError()
  }

  return data.localidade.trim().toUpperCase()
}
