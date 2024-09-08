import { Injectable } from '@nestjs/common';
import { AssetsRepository } from '../repositories/assets.repository';

@Injectable()
export class DeleteAssetsUseCase {
  constructor(private readonly assetRepository: AssetsRepository) {}

  async execute(id: string) {
    const newAsset = await this.assetRepository.deleteAsset(id);
    return newAsset;
  }
}
  