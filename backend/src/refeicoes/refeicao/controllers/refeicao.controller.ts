import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefeicaoService } from '../services/refeicao.service';

@Controller('refeicao')
export class RefeicaoController {
  
  constructor(private refeicaoService: RefeicaoService) {}
  
  @Get()
  pegarTodasRefeicoes() {
    return this.refeicaoService.pegarTodas();
  }
}
