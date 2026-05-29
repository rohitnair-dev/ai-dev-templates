// feature.module.ts
// Production NestJS Feature Module Structure
// Part of ai-dev-templates by Rohit Nair — github.com/rohitnair-dev
//
// This is the folder structure and module pattern I follow
// for every production NestJS feature module.
//
// FOLDER STRUCTURE:
// src/modules/posts/
//   controllers/
//     posts.controller.ts      ← HTTP only, no business logic
//   services/
//     posts.service.ts         ← all business logic lives here
//   dto/
//     create-post.dto.ts       ← validated request shapes
//     update-post.dto.ts
//   interfaces/
//     post.interface.ts        ← TypeScript contracts
//   guards/
//     post-owner.guard.ts      ← resource-level auth
//   posts.module.ts            ← wires everything together

import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [
    // Import other modules this feature depends on
    // e.g. JwtModule, TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    JwtAuthGuard,
  ],
  exports: [
    // Export PostsService if other modules need it
    PostsService,
  ],
})
export class PostsModule {}

// ── Controller skeleton (controllers/posts.controller.ts) ──────
//
// import { Controller, Get, Post, Put, Delete,
//          Param, Body, Req, UseGuards } from '@nestjs/common';
// import { PostsService } from '../services/posts.service';
// import { CreatePostDto } from '../dto/create-post.dto';
// import { JwtAuthGuard } from '../../auth/guards/auth.guard';
//
// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}
//
//   // PUBLIC
//   @Get()
//   findAll() {
//     return this.postsService.findAll();           // delegate, nothing else
//   }
//
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postsService.findOne(id);
//   }
//
//   // PROTECTED
//   @UseGuards(JwtAuthGuard)
//   @Post()
//   create(@Body() dto: CreatePostDto, @Req() req) {
//     return this.postsService.create(dto, req.user);
//   }
//
//   @UseGuards(JwtAuthGuard)
//   @Put(':id')
//   update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
//     return this.postsService.update(id, dto);
//   }
//
//   @UseGuards(JwtAuthGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postsService.remove(id);
//   }
// }

// ── Service skeleton (services/posts.service.ts) ───────────────
//
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { createClient } from '@supabase/supabase-js';
//
// @Injectable()
// export class PostsService {
//   // All business logic lives here
//   // Controller methods should be 1-2 lines max
//
//   async findAll() {
//     // database query
//   }
//
//   async findOne(id: string) {
//     const post = await this.db.from('posts').select('*').eq('id', id).single();
//     if (!post.data) throw new NotFoundException(`Post ${id} not found`);
//     return post.data;
//   }
//
//   async create(dto: CreatePostDto, user: JwtPayload) {
//     // validate → transform → save → return
//   }
//
//   async update(id: string, dto: UpdatePostDto) {
//     await this.findOne(id); // throws if not found
//     // update logic
//   }
//
//   async remove(id: string) {
//     await this.findOne(id); // throws if not found
//     // delete logic
//   }
// }

// ── DTO skeleton (dto/create-post.dto.ts) ─────────────────────
//
// import { IsString, IsNotEmpty, IsOptional,
//          IsArray, MaxLength } from 'class-validator';
//
// export class CreatePostDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;
//
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(500)
//   excerpt: string;
//
//   @IsString()
//   @IsNotEmpty()
//   content: string;
//
//   @IsArray()
//   @IsOptional()
//   tags?: string[];
//
//   @IsString()
//   @IsOptional()
//   linkedin_url?: string;
// }

// ── Three rules I never break ──────────────────────────────────
//
// 1. Controllers are thin — receive, delegate, respond only
//    If controller method > 10 lines — extract to service
//
// 2. Services own everything — validation, transformation,
//    database calls, error handling, external APIs
//
// 3. DTOs are not optional — every input validated with
//    class-validator before touching the service
//    No exceptions. Not even for internal endpoints.
