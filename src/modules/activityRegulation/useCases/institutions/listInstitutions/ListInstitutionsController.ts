/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListInstitutionsUseCase } from "./ListInstitutionsUseCase";

class ListInstitutionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, registersPerPage, filter, isActive } = request.query;

    const listInstitutionsUseCase = container.resolve(ListInstitutionsUseCase);

    const institutions = await listInstitutionsUseCase.execute({
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.status(200).json(institutions);
  }
}

export { ListInstitutionsController };
