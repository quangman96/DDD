import { Injectable } from '@nestjs/common';
import { AssetsRepository } from '../repositories/assets.repository';

@Injectable()
export class CreateAssetsUseCase {
  constructor(private readonly assetRepository: AssetsRepository) {}

  async execute(asset: { name: string; type: string; serial: string }) {
    const newAsset = await this.assetRepository.insertAssets(asset);
    return newAsset;
  }
}
