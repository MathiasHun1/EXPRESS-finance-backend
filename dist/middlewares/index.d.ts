import type { NextFunction, Request, Response } from 'express';
export declare const newPotParser: (req: Request, res: Response, next: NextFunction) => void;
export declare const updatedPotParser: (req: Request, res: Response, next: NextFunction) => void;
export declare const budgetParser: (req: Request, res: Response, next: NextFunction) => void;
export declare const transactionsParser: (req: Request, res: Response, next: NextFunction) => void;
export declare const newUserParser: (req: Request, res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
export declare const userExtractor: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map