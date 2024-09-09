import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerService} from '../src/shortener/shortener.service'

describe('LinkService', () => {
    let service: ShortenerService;
    const mockGetByNum = jest.fn();
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            ShortenerService,
        ],
      }).compile();
  
      service = module.get<ShortenerService>(ShortenerService);
      service['findLinkByNum'] = mockGetByNum;
    });
  
    it('should return the first number that has no document', async () => {
      const numWithDocument = 0;
      const numWithoutDocument = 1;
      
      mockGetByNum
        .mockResolvedValueOnce({}) 
        .mockResolvedValueOnce(null); 
  
      const result = await service.findNum();
  
      expect(result).toBe(numWithoutDocument);
      expect(mockGetByNum).toHaveBeenCalledTimes(2);
      expect(mockGetByNum).toHaveBeenCalledWith(numWithDocument);
      expect(mockGetByNum).toHaveBeenCalledWith(numWithoutDocument);
    });
  
    it('should handle case where no document is found', async () => {
      const numToReturn = 0;
      
      mockGetByNum.mockResolvedValueOnce(null); 
  
      const result = await service.findNum();
  
      expect(result).toBe(numToReturn);
      expect(mockGetByNum).toHaveBeenCalledTimes(1);
      expect(mockGetByNum).toHaveBeenCalledWith(numToReturn);
    });
  });
