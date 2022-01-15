import { IRegulationResponseDTO } from "../dtos/regulation/IRegulationResponseDTO";
import { Regulation } from "../infra/typeorm/entities/Regulation";

class RegulationMap {
  static toDTO(regulation: Regulation): IRegulationResponseDTO {
    const regulationDTO: IRegulationResponseDTO = {
      id: regulation.id,
      name: regulation.name,
      inForceFrom: regulation.inForceFrom,
      file: regulation.file,
      fileUrl: regulation.fileUrl(),
      isActive: regulation.isActive,
      createdAt: regulation.createdAt,

      courseId: regulation.courseId,
      courseName: regulation.course.name,
    };

    return regulationDTO;
  }
}

export { RegulationMap };
