import { Injectable } from '@nestjs/common';
import { AssetsRepository } from '../repositories/assets.repository';

@Injectable()
export class GetAssetsUseCase {
  constructor(private readonly assetRepository: AssetsRepository) {}

  async execute() {
    const assets = await this.assetRepository.getAssets();
    return assets;
  }
}
