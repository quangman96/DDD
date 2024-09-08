import { Injectable } from '@nestjs/common';
import { AssetsRepository } from '../repositories/assets.repository';

@Injectable()
export class UpdateAssetsUseCase {
  constructor(private readonly assetRepository: AssetsRepository) {}

  async execute(id: string, asset: { name: string; type: string; serial: string }) {
    const updatedAsset = await this.assetRepository.updateAsset(id, asset);
    return updatedAsset;
  }
}