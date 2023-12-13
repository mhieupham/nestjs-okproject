import { Controller, Get, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@ApiTags('Home')
@Controller()
@Injectable()
export class HomeController {
  constructor(
    private service: HomeService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  appInfo() {
    return this.service.appInfo();
  }

  @Get('products')
  public async product() {
    const slaveQueryRunner = this.connection.createQueryRunner('slave');
    let userFromSlave;
    try {
      userFromSlave = await slaveQueryRunner.query(
        'SELECT * FROM products limit 1000',
        [],
      );
    } finally {
      await slaveQueryRunner.release();
    }

    return userFromSlave[0].name;
    // this.connection.query('SELECT * FROM products limit 1000', []);
    // return true;
  }
}
