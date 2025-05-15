import { Module } from '@nestjs/common';
import { DateController } from './date.controller';
import { DateService } from './date.service';

@Module({
	imports: [],
	controllers: [DateController],
	providers: [DateService],
	exports: [DateService],
})
export class DateModule { }
