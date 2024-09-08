import { Controller, Post, Body, Res, HttpStatus, Get, Delete, Param, Put } from '@nestjs/common';
import { CreateAssetsUseCase } from '../use-cases/create-asset.use-case';
import { GetAssetsUseCase } from '../use-cases/get-asset.use-case';
import { DeleteAssetsUseCase } from '../use-cases/delete-asset.use-case';
import { UpdateAssetsUseCase } from '../use-cases/update-asset.use-case';
import { Response } from 'express';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly createAssetsUseCase: CreateAssetsUseCase,
    private readonly getAssetsUseCase: GetAssetsUseCase,
    private readonly deleteAssetsUseCase: DeleteAssetsUseCase,
    private readonly updateAssetsUseCase: UpdateAssetsUseCase,
  ) {}

  @Get()
  async getAssets(@Res() res: Response) {
    try {
      const assets = await this.getAssetsUseCase.execute();
      res.status(HttpStatus.OK).json(assets);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  @Post()
  async createAsset(
    @Body() asset: { name: string; type: string; serial: string },
    @Res() res: Response,
  ) {
    try {
      const newAsset = await this.createAssetsUseCase.execute(asset);
      res.status(HttpStatus.CREATED).json(newAsset);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Delete(':id')
  async deleteAsset(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.deleteAssetsUseCase.execute(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  @Put(':id')
  async updateAsset(@Param('id') id: string, @Body() asset: { name: string; type: string; serial: string }, @Res() res: Response) {
    try {
      const updatedAsset = await this.updateAssetsUseCase.execute(id, asset);
      res.status(HttpStatus.OK).json(updatedAsset);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
