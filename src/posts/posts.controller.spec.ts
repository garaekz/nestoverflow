import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = ['test1', 'test2'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      const result = 'test';
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne('objectId')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('objectId');
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => null);

      expect(() => controller.findOne('objectId')).toThrow();
      expect(service.findOne).toHaveBeenCalledWith('objectId');
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const result = 'test';
      jest.spyOn(service, 'create').mockImplementation(() => result);

      expect(controller.create('test')).toBe(result);
      expect(service.create).toHaveBeenCalledWith('test');
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => null);

      expect(() => controller.create('test')).toThrow();
      expect(service.create).toHaveBeenCalledWith('test');
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const result = 'test';
      jest.spyOn(service, 'update').mockImplementation(() => result);

      expect(controller.update('objectId', 'test')).toBe(result);
      expect(service.update).toHaveBeenCalledWith('objectId', 'test');
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'update').mockImplementation(() => null);

      expect(() => controller.update('objectId', 'test')).toThrow();
      expect(service.update).toHaveBeenCalledWith('objectId', 'test');
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const result = 'test';
      jest.spyOn(service, 'remove').mockImplementation(() => result);

      expect(controller.remove('objectId')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith('objectId');
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => null);

      expect(() => controller.remove('objectId')).toThrow();
      expect(service.remove).toHaveBeenCalledWith('objectId');
    });
  });
});
