import { Module } from '@nestjs/common';
import { AssetController } from './controllers/assets.controller';
import { AssetsRepository } from './repositories/assets.repository';
import { CreateAssetsUseCase } from './use-cases/create-asset.use-case';
import { GetAssetsUseCase } from './use-cases/get-asset.use-case';
import { DeleteAssetsUseCase } from './use-cases/delete-asset.use-case';
import { UpdateAssetsUseCase } from './use-cases/update-asset.use-case';

@Module({
  imports: [],
  controllers: [AssetController],
  providers: [
    AssetsRepository,
    CreateAssetsUseCase,
    GetAssetsUseCase,
    DeleteAssetsUseCase,
    UpdateAssetsUseCase,
  ],
})
export class AppModule {}
