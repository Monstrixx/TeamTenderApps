import { Request, Response, NextFunction } from 'express';
import PersonnelService from '../services/PersonnelService';
import PersonnelSKKService from '../services/PersonnelSKKService';

export class PersonnelController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const personnel = await PersonnelService.createPersonnel(data);
      res.status(201).json(personnel);
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PersonnelService.getPersonnel(req.query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const personnel = await PersonnelService.getPersonnelById(id);
      res.status(200).json(personnel);
    } catch (error) {
      next(error);
    }
  }

  public static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const profile = await PersonnelService.getPersonnelProfile(id);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const personnel = await PersonnelService.updatePersonnel(id, req.body);
      res.status(200).json(personnel);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const personnel = await PersonnelService.deletePersonnel(id);
      res.status(200).json(personnel);
    } catch (error) {
      next(error);
    }
  }

  public static async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const personnel = await PersonnelService.restorePersonnel(id);
      res.status(200).json(personnel);
    } catch (error) {
      next(error);
    }
  }

  public static async verifySKK(req: Request, res: Response, next: NextFunction) {
    try {
      const { skkId } = req.params;
      const skk = await PersonnelSKKService.verifySKK(skkId);
      res.status(200).json(skk);
    } catch (error) {
      next(error);
    }
  }
}
