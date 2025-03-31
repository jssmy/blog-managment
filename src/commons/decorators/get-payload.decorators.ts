
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetPayload = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const payload = request.user;


  if (!payload) {
    throw new InternalServerErrorException('Payload information is missing');
  }

  
  return payload;
});
