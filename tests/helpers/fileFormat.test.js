import { formatLocalFile } from '@spotlightdata/nanowire-extensions';

const mockFile = {
  name: 'test.png',
  id: 'test-id',
  extension: 'png',
  size: 12,
  data: {
    lastModified: Date.now(),
    created: Date.now(),
  },
};

describe('helpers/fileFormat', () => {
  describe('formatLocalFile', () => {
    it('should not pass down unneded user data', () => {
      const user = {
        _id: 'user-id',
        email: 'test@test.com',
        name: 'Test User',
        trash1: 'trash1',
        trash2: 'trash2',
      };
      const file = formatLocalFile(mockFile, user);
      expect(file.lastModified.trash1).toBeUndefined();
      expect(file.lastModified.trash2).toBeUndefined();
    });
  });
});
