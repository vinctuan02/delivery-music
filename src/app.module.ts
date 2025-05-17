import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidationSchema } from './common/config/validation-config';
import { DatabaseOptions } from './common/typeorm/ormconfig';
import { DeliveryModule } from './delivery/delivery.module';
import { JobModule } from './job/job.module';
import { HelperModule } from './helper/helper.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DdexGeneratorModule } from './ddex-generator/ddex-generator.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envValidationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: DatabaseOptions,
		}),
		HelperModule,
		DashboardModule,
		DeliveryModule,
		JobModule,
		DdexGeneratorModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
