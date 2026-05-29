src/
  modules/
    posts/
      controllers/
        posts.controller.ts      ← HTTP only, no logic
      services/
        posts.service.ts         ← all business logic lives here
      dto/
        create-post.dto.ts       ← validated request shapes
        update-post.dto.ts
      interfaces/
        post.interface.ts        ← TypeScript contracts
      guards/
        post-owner.guard.ts      ← resource-level auth
      posts.module.ts            ← wires everything together
