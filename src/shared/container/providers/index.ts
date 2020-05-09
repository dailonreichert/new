import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/ISotrageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
