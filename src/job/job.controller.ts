import { Controller, Get } from "@nestjs/common";
import { JobService } from "./job.service";

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Get()
    async test(){
        return this.jobService.test();
    }
}
