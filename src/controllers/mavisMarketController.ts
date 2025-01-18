import { Request, Response } from 'express';
import { MavisMarketService } from 'src/services/mavisMarket.service';

export class MavisMarketController {
  private marketService: MavisMarketService;

  constructor() {
    this.marketService = new MavisMarketService();

    this.getGenkaiSale = this.getGenkaiSale.bind(this);
    this.getGenkaiAuction = this.getGenkaiAuction.bind(this);
    this.getPixelPetSale = this.getPixelPetSale.bind(this);
    this.getPixelPetAuction = this.getPixelPetAuction.bind(this);
    this.getCyberKongzSale = this.getCyberKongzSale.bind(this);
    this.getCyberKongzAuction = this.getCyberKongzAuction.bind(this);
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
