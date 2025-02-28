import { Request, Response } from 'express';
import { AxieMarketService } from 'src/services/axieMarket.service';
import { autoBindMethods } from 'src/utils/common';

export class AxieMarketController {
  private marketService: AxieMarketService;

  constructor() {
    this.marketService = new AxieMarketService();
    autoBindMethods(this);
  }

  public async getExchangeRates(req: Request, res: Response) {
    const {
      variables = {
        tokens: ['axs', 'eth', 'ron', 'slp', 'usd', 'usdc'],
      },
    } = req.body;
    try {
      const data = await this.marketService.fetchExchangeRates(variables);
      res.status(200).json({ status: 20, data });
    } catch (error: any) {
      console.error('fetch exchange rates error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  public async getLandSale(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchLandSale(variables);
      res.status(200).json({ status: 20, data });
    } catch (error: any) {
      console.error('fetch land sales:', error);
      res.status(500).json({ error: error.message });
    }
  }
  public async getLandAuction(req: Request, res: Response) {
    const { variables = { size: 50 } } = req.body;

    try {
      const data = await this.marketService.fetchLandAuction(variables);
      res.status(200).json({ status: 20, data });
    } catch (error: any) {
      console.error('fetch land sales:', error);
      res.status(500).json({ error: error.message });
    }
  }
  public async getErc1155TokenSale(req: Request, res: Response) {
    const { variables = {} } = req.body;

    try {
      const data = await this.marketService.fetchErc1155TokenSale(variables);
      res.status(200).json({ status: 20, data });
    } catch (error: any) {
      console.error('fetch land sales:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
