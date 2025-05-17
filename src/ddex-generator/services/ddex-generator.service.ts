import { Injectable } from "@nestjs/common";
import { DdexGeneratorFolderService } from "./ddex-generator.folder.service";
import { DdexGeneratorFileService } from "./ddex-generator.file.service";
import path from "path";

@Injectable()
export class DdexGeneratorService {
    constructor(
        private readonly ddexGeneratorFileService: DdexGeneratorFileService,
        private readonly ddexGeneratorFolderService: DdexGeneratorFolderService
    ){}

    async generate(){

        const folderStructure = {
            DDEX: {
              NewReleaseMessage: {
                Releases: {
                  Album_001: {
                    Audio: {},
                    Metadata: {},
                    Cover: {},
                    Videos: {},
                  },
                  Single_002: {
                    Audio: {},
                    Metadata: {},
                    Cover: {},
                  },
                },
                Logs: {},
                Temp: {},
              },
              Archive: {
                OldMessages: {},
                Reports: {},
              },
            },
          };
          
        await this.ddexGeneratorFolderService.createFolderStructure(
           path.join(__dirname, 'output'),
            folderStructure
          );
    }
}