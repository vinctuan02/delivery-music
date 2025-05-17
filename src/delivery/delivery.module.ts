import { Module } from "@nestjs/common";
import { DeliveryController } from "./delivery.controller";
import { DeliveryService } from "./services/delivery.service";
import { DeliverySoundCloudService } from "./services/delivery.sound-cloud.service";

@Module({
  imports: [],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliverySoundCloudService],
})
export class DeliveryModule {}
