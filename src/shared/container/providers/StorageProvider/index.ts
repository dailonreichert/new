import { container } from 'tsyringe';
import IStorageProvider from './models/ISotrageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const provider = {
  diskStorage: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider.diskStorage,
);
