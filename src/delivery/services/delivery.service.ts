import { Injectable } from "@nestjs/common";
import { DeliverySoundCloudService } from "./delivery.sound-cloud.service";
import * as fs from 'fs';

@Injectable()
export class DeliveryService {
    constructor(private readonly deliverySoundCloudService: DeliverySoundCloudService) {}

    async uploadSoundCloud() {
        const localPath = "src/output/20250517123000001/A10301A0001887532A/A10301A0001887532A.xml";
        const remotePath = "test_upload";

        // const files = await fs.promises.readdir(localPath);
        // console.log(`Files in ${localPath}:`, files);
        // await this.deliverySoundCloudService.testConnection()
        return this.deliverySoundCloudService.uploadFile(localPath, remotePath);
    }
}
