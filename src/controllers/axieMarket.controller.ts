import { Request, Response } from 'express';
import { AxieMarketService } from 'src/services/axieMarket.service';

export class AxieMarketController {
  private marketService: AxieMarketService;

  constructor() {
    this.marketService = new AxieMarketService();
  }

  public getMarketData = async (req: Request, res: Response) => {
    const { queryType, variables = {} } = req.body;

    try {
      if (!queryType) {
        throw new Error('queryType is required!');
      }

      const data = await this.marketService.fetchMarketData(queryType, variables);
      res.status(200).json({ status: 200, data });
    } catch (error: any) {
      console.error('Axie Marketplace error:', error);
      res.status(500).json({ error: error.message });
    }
  };
}
