import { Controller, Post } from "@nestjs/common";
import { DdexGeneratorService } from "./services/ddex-generator.service";

@Controller("ddex-generator")
export class DdexGeneratorController {
  constructor(private readonly ddexGeneratorService: DdexGeneratorService) {}

  @Post()
  async generate(){
    return this.ddexGeneratorService.generate();
  }
}
