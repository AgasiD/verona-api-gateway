import { GatewayTimeoutException, HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export const handleHttpErrors = (error) => {

    if (error.message && error.message === 'Timeout has occurred') {
        throw new GatewayTimeoutException('El microservicio no respondió a tiempo');
    }

    switch (error.status) {
        case 500:
            throw new InternalServerErrorException(error.message ?? 'Error')
            break;
        case 404:
            throw new NotFoundException(error.message ?? 'Error')
            break;
            
        default:
            throw new HttpException(error.message ?? 'Error', error.status);
    }



}