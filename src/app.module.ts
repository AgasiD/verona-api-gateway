import { Module } from '@nestjs/common';
import { ObrasModule } from './obras/obras.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ControlesModule } from './controles/controles.module';
import { InactividadesModule } from './inactividades/inactividades.module';
import { WixModule } from './wix/wix.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ObrasModule, 
    UsuariosModule, PedidosModule, ControlesModule, InactividadesModule, WixModule, AuthModule, FilesModule,],
  })
  export class AppModule {
    
  }
  
