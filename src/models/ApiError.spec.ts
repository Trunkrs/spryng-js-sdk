import ApiError from './ApiError'

describe('ApiError', () => {
  it('should genereate a name using the error code', () => {
    expect(new ApiError(401, 'not authorized').name).toBe('UNAUTHORIZED')
    expect(new ApiError(404, 'not authorized').name).toBe('NOT FOUND')
    expect(new ApiError(405, 'not authorized').name).toBe('METHOD NOT ALLOWED')
    expect(new ApiError(422, 'not authorized').name).toBe(
      'UNPROCESSABLE ENTITY',
    )
    expect(new ApiError(429, 'not authorized').name).toBe('TOO MANY REQUESTS')
    expect(new ApiError(500, 'not authorized').name).toBe(
      'INTERNAL SERVER ERROR',
    )
    expect(new ApiError(503, 'not authorized').name).toBe('SERVICE UNAVAILABLE')
  })
})
