import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'

import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from '../http/graphql/resolvers/courses.resolver';
import { StudentsResolver } from '../http/graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from '../http/graphql/resolvers/enrollments.resolver';

import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';
import { CoursesService } from '../services/courses.service';

import path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    CoursesService,
    StudentsService,
    EnrollmentsService,

  ],
})

export class HttpModule { }

