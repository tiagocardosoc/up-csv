// src/FileService.test.ts
import { describe, it, expect, vi } from 'vitest'
import FileServiceStub from '../test/service-stub/FileServiceStub'
import { IOptionsService } from '../interfaces/options.interface'
import { IItems } from '../interfaces/items.interface'
import { IResponseApi } from '../interfaces/service.interface'

describe('FileService', () => {
    const mockSetLoading = vi.fn()
    const fileService = new FileServiceStub({ setLoading: mockSetLoading } as IOptionsService)

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should upload file successfully', async () => {
        const mockFile = new File(['dummy content'], 'test.csv', { type: 'text/csv' })
        const mockResponse = { message: 'Upload successful' }

        vi.fn().mockResolvedValueOnce(mockResponse)

        const response = await fileService.uploadFileWithSuccess(mockFile)

        expect(response).toEqual(mockResponse)
    })

    it('should handle error during file upload', async () => {
        const mockFile = new File(['dummy content'], 'test.csv', { type: 'text/csv' })
        const mockError = new Error('Upload failed')

        vi.fn().mockRejectedValueOnce(mockError)

        const response = await fileService.uploadFileWithError(mockFile)

        expect(response).toEqual({
            message: 'Error uploading file',
            error: true,
        })
    })

    it('should search for files successfully', async () => {
        const mockQuery = 'test'
        const mockData: IItems[] = [
            {
                name: "Test 1",
                city: "City 1",
                country: "Country 1",
                favorite_sport: "Sport 1"
            },
            {
                name: "Test 2",
                city: "City 2",
                country: "Country 2",
                favorite_sport: "Sport 2"
            },
            {
                name: "Test 3",
                city: "City 3",
                country: "Country 3",
                favorite_sport: "Sport 3"
            },
            {
                name: "Test 4",
                city: "City 4",
                country: "Country 4",
                favorite_sport: "Sport 4"
            }
        ]

        const mockResponse: IResponseApi<IItems[]> = { message: 'Search successful', data: mockData }

        vi.fn().mockResolvedValueOnce({ data: mockResponse })

        const response = await fileService.searchFileWithSucess(mockQuery)

        expect(response).toEqual(mockResponse)
    })

    it('should handle error during file search', async () => {
        const mockQuery = 'test'
        const mockError = new Error('Search failed')

        vi.fn().mockRejectedValueOnce(mockError)

        const response = await fileService.searchFileWithError(mockQuery)

        expect(response).toEqual({
            message: 'Error searching file',
            error: true,
        })
    })
})
