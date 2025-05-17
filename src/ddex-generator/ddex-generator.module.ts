import { Module } from "@nestjs/common";
import { DdexGeneratorController } from "./ddex-generator.controller";
import { DdexGeneratorService } from "./services/ddex-generator.service";
import { DdexGeneratorFileService } from "./services/ddex-generator.file.service";
import { DdexGeneratorFolderService } from "./services/ddex-generator.folder.service";

@Module({
  imports: [],
  controllers: [DdexGeneratorController],
  providers: [DdexGeneratorService, DdexGeneratorFileService, DdexGeneratorFolderService],
})
export class DdexGeneratorModule {}
