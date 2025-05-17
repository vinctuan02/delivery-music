import { Body, Controller, Get, Post } from "@nestjs/common";
import { DeliveryService } from "./services/delivery.service";

@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get("sound-cloud")
  async uploadSoundCloud() {
    return this.deliveryService.uploadSoundCloud();
  }
}
