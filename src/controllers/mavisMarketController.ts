import { Request, Response } from 'express';
import { MavisMarketService } from 'src/services/mavisMarket.service';
import { autoBindMethods } from 'src/utils/common';

export class MavisMarketController {
  private marketService: MavisMarketService;

  constructor() {
    this.marketService = new MavisMarketService();
    autoBindMethods(this);
  }

  public async getGenkaiSale(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchGenkaiSale(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }

  public async getGenkaiAuction(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchGenkaiAuction(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }

  public async getPixelPetSale(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchPixelPetSale(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }

  public async getPixelPetAuction(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchPixelPetAuction(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }

  public async getCyberKongzSale(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchCyberKongzSale(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }

  public async getCyberKongzAuction(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchCyberKongzAuction(variables);
      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error('fetch genkai sales:', error);
    }
  }
}
